const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// ==========================================
// MYSQL CONNECTION
// ==========================================

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "smart_dairy",
});

// ==========================================
// CONNECT TO MYSQL
// ==========================================

db.connect((err) => {
  if (err) {
    console.error("❌ MySQL connection failed:", err.message);
    return;
  }

  console.log("✅ MySQL connected successfully!");
});

// ==========================================
// TEST API
// ==========================================

app.get("/", (req, res) => {
  res.json({
    message: "Smart Dairy Backend is running!",
  });
});

// ==========================================
// SERVER PORT
// ==========================================

const PORT = 5000;

// ==========================================
// FARMER REGISTRATION
// ==========================================

app.post("/api/farmers", (req, res) => {
  console.log("=================================");
  console.log("📥 Farmer registration request:");
  console.log(req.body);

  const {
    farmerId,
    name,
    mobile,
    village,
    password,
  } = req.body;

  if (!farmerId || !name || !mobile || !password) {
    console.log("❌ Required fields missing");

    return res.status(400).json({
      message: "Required fields are missing.",
    });
  }

  const sql = `
    INSERT INTO farmers
    (
      farmer_id,
      name,
      mobile,
      village,
      password
    )
    VALUES (?, ?, ?, ?, ?)
  `;

  const values = [
    farmerId,
    name,
    mobile,
    village || "",
    password,
  ];

  console.log("📤 Sending data to MySQL:");
  console.log(values);

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error(
        "❌ Farmer insert error:",
        err.message
      );

      return res.status(500).json({
        message: "Failed to register farmer.",
        error: err.message,
      });
    }

    console.log("✅ Farmer inserted successfully!");
    console.log("🆔 MySQL ID:", result.insertId);

    res.status(201).json({
      message: "Farmer registered successfully.",
      id: result.insertId,
    });
  });
});
// ==========================================
// DELETE FARMER
// ==========================================

app.delete("/api/farmers/:id", (req, res) => {
  const { id } = req.params;

  const sql = `
    DELETE FROM farmers
    WHERE id = ?
  `;

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error(
        "Delete Farmer Error:",
        err
      );

      return res.status(500).json({
        message: "Failed to delete farmer",
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Farmer not found",
      });
    }

    res.json({
      message: "Farmer deleted successfully",
    });
  });
});
// ==========================================
// GET ALL FARMERS
// ==========================================

app.get("/api/farmers", (req, res) => {
  console.log("📥 Fetching all farmers...");

  const sql = `
    SELECT
      id,
      farmer_id,
      name,
      mobile,
      village
    FROM farmers
    ORDER BY id DESC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error(
        "❌ Fetch farmers error:",
        err.message
      );

      return res.status(500).json({
        message: "Failed to fetch farmers.",
        error: err.message,
      });
    }

    console.log(
      "✅ Farmers fetched:",
      results.length
    );

    res.json({
      farmers: results,
    });
  });
});

// ==========================================
// FARMER LOGIN
// ==========================================

app.post("/api/farmers/login", (req, res) => {
  const {
    mobile,
    password,
  } = req.body;

  if (!mobile || !password) {
    return res.status(400).json({
      message:
        "Mobile number and password are required.",
    });
  }

  const sql = `
    SELECT
      id,
      farmer_id,
      name,
      mobile,
      village
    FROM farmers
    WHERE mobile = ? AND password = ?
  `;

  db.query(
    sql,
    [mobile, password],
    (err, results) => {
      if (err) {
        console.error(
          "❌ Farmer login error:",
          err.message
        );

        return res.status(500).json({
          message: "Login failed.",
        });
      }

      if (results.length === 0) {
        return res.status(401).json({
          message:
            "Invalid mobile number or password.",
        });
      }

      const farmer = results[0];

      res.json({
        message: "Login successful.",
        farmer,
      });
    }
  );
});

// ==========================================
// DAIRY LOGIN
// ==========================================

app.post("/api/dairy/login", (req, res) => {
  const {
    mobile,
    password,
  } = req.body;

  if (!mobile || !password) {
    return res.status(400).json({
      message:
        "Mobile number and password are required.",
    });
  }

  const sql = `
    SELECT
      id,
      mobile,
      role
    FROM dairy_users
    WHERE mobile = ? AND password = ?
  `;

  db.query(
    sql,
    [mobile, password],
    (err, results) => {
      if (err) {
        console.error(
          "❌ Dairy login error:",
          err.message
        );

        return res.status(500).json({
          message: "Dairy login failed.",
        });
      }

      if (results.length === 0) {
        return res.status(401).json({
          message:
            "Invalid dairy mobile number or password.",
        });
      }

      const dairyUser = results[0];

      res.json({
        message: "Dairy login successful.",
        dairyUser,
      });
    }
  );
});

// ==========================================
// CENTER SETTINGS - GET
// ==========================================

app.get("/api/center-settings", (req, res) => {
  const sql = `
    SELECT *
    FROM center_settings
    ORDER BY id DESC
    LIMIT 1
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error(
        "❌ Center settings fetch error:",
        err.message
      );

      return res.status(500).json({
        message:
          "Failed to fetch center settings.",
      });
    }

    res.json({
      settings:
        results.length > 0
          ? results[0]
          : null,
    });
  });
});

// ==========================================
// CENTER SETTINGS - POST
// ==========================================

app.post("/api/center-settings", (req, res) => {
  const {
    centerName,
    inchargeName,
    mobile,
    village,
    address,
    milkRate,
  } = req.body;

  if (!centerName || !mobile) {
    return res.status(400).json({
      message:
        "Center name and mobile are required.",
    });
  }

  const sql = `
    INSERT INTO center_settings
    (
      center_name,
      incharge_name,
      mobile,
      village,
      address,
      milk_rate
    )
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  const values = [
    centerName,
    inchargeName || "",
    mobile,
    village || "",
    address || "",
    Number(milkRate) || 0,
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error(
        "❌ Center settings save error:",
        err.message
      );

      return res.status(500).json({
        message:
          "Failed to save center settings.",
        error: err.message,
      });
    }

    res.status(201).json({
      message:
        "Center settings saved successfully.",
      id: result.insertId,
    });
  });
});


// ==========================================
// COWS - GET ALL COWS FOR FARMER
// ==========================================

app.get("/api/cows/:farmerId", (req, res) => {
  const { farmerId } = req.params;

  const farmerSql = `
    SELECT id
    FROM farmers
    WHERE farmer_id = ?
  `;

  db.query(farmerSql, [farmerId], (farmerErr, farmerResults) => {
    if (farmerErr) {
      console.error("❌ Farmer lookup error:", farmerErr.message);

      return res.status(500).json({
        message: "Failed to find farmer.",
      });
    }

    if (farmerResults.length === 0) {
      return res.status(404).json({
        message: "Farmer not found.",
      });
    }

    const farmerDbId = farmerResults[0].id;

    const sql = `
      SELECT
        id,
        farmer_id,
        tag_number,
        breed,
        age,
        purchase_date,
        status,
        created_at
      FROM cows
      WHERE farmer_id = ?
      ORDER BY id DESC
    `;

    db.query(sql, [farmerDbId], (err, results) => {
      if (err) {
        console.error("❌ Fetch cows error:", err.message);

        return res.status(500).json({
          message: "Failed to fetch cows.",
        });
      }

      res.json({
        cows: results,
      });
    });
  });
});

// ==========================================
// ADD COW
// ==========================================

app.post("/api/cows", (req, res) => {
  const {
    farmerId,
    tagNumber,
    breed,
    age,
    purchaseDate,
    status,
  } = req.body;

  if (
    !farmerId ||
    !tagNumber ||
    !breed ||
    age === undefined ||
    !purchaseDate
  ) {
    return res.status(400).json({
      message: "Required cow details are missing.",
    });
  }

  const farmerSql = `
    SELECT id
    FROM farmers
    WHERE farmer_id = ?
  `;

  db.query(farmerSql, [farmerId], (farmerErr, farmerResults) => {
    if (farmerErr) {
      console.error("❌ Farmer lookup error:", farmerErr.message);

      return res.status(500).json({
        message: "Failed to find farmer.",
      });
    }

    if (farmerResults.length === 0) {
      return res.status(404).json({
        message: "Farmer not found.",
      });
    }

    const farmerDbId = farmerResults[0].id;

    const sql = `
      INSERT INTO cows
      (
        farmer_id,
        tag_number,
        breed,
        age,
        purchase_date,
        status
      )
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(
      sql,
      [
        farmerDbId,
        tagNumber.trim(),
        breed.trim(),
        Number(age),
        purchaseDate,
        status || "Active",
      ],
      (err, result) => {
        if (err) {
          console.error("❌ Cow insert error:", err.message);

          return res.status(500).json({
            message: "Failed to add cow.",
            error: err.message,
          });
        }

        res.status(201).json({
          message: "Cow added successfully.",
          id: result.insertId,
        });
      }
    );
  });
});

// ==========================================
// DELETE COW
// ==========================================

app.delete("/api/cows/:id", (req, res) => {
  const { id } = req.params;

  const sql = `
    DELETE FROM cows
    WHERE id = ?
  `;

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("❌ Delete cow error:", err.message);

      return res.status(500).json({
        message: "Failed to delete cow.",
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Cow not found.",
      });
    }

    res.json({
      message: "Cow deleted successfully.",
    });
  });
});

// ==========================================
// HEALTH RECORDS - GET
// ==========================================

app.get("/api/cow-health/:farmerId", (req, res) => {
  const { farmerId } = req.params;

  const sql = `
    SELECT
      chr.id,
      chr.cow_id AS cowId,
      c.tag_number AS tagNumber,
      c.breed,
      chr.vaccine,
      chr.vaccination_date AS vaccinationDate,
      chr.next_due_date AS nextDueDate,
      chr.status AS healthStatus,
      chr.notes
    FROM cow_health_records chr
    INNER JOIN cows c
      ON chr.cow_id = c.id
    INNER JOIN farmers f
      ON c.farmer_id = f.id
    WHERE f.farmer_id = ?
    ORDER BY chr.id DESC
  `;

  db.query(sql, [farmerId], (err, results) => {
    if (err) {
      console.error(
        "❌ Fetch health records error:",
        err.message
      );

      return res.status(500).json({
        message: "Failed to fetch health records.",
      });
    }

    res.json({
      records: results,
    });
  });
});

// ==========================================
// ADD HEALTH RECORD
// ==========================================

app.post("/api/cow-health", (req, res) => {
  const {
    farmerId,
    cowId,
    vaccine,
    vaccinationDate,
    nextDueDate,
    healthStatus,
    notes,
  } = req.body;

  if (
    !farmerId ||
    !cowId ||
    !vaccine ||
    !vaccinationDate ||
    !nextDueDate
  ) {
    return res.status(400).json({
      message: "Required health details are missing.",
    });
  }

  const sql = `
    INSERT INTO cow_health_records
    (
      cow_id,
      vaccine,
      vaccination_date,
      next_due_date,
      status,
      notes
    )
    SELECT
      c.id,
      ?,
      ?,
      ?,
      ?,
      ?
    FROM cows c
    INNER JOIN farmers f
      ON c.farmer_id = f.id
    WHERE c.id = ?
      AND f.farmer_id = ?
  `;

  db.query(
    sql,
    [
      vaccine.trim(),
      vaccinationDate,
      nextDueDate,
      healthStatus || "Healthy",
      notes || "",
      Number(cowId),
      farmerId,
    ],
    (err, result) => {
      if (err) {
        console.error(
          "❌ Health insert error:",
          err.message
        );

        return res.status(500).json({
          message: "Failed to add health record.",
          error: err.message,
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          message:
            "Cow not found or does not belong to this farmer.",
        });
      }

      res.status(201).json({
        message: "Health record added successfully.",
        id: result.insertId,
      });
    }
  );
});

// ==========================================
// PREGNANCY RECORDS - GET
// ==========================================

app.get("/api/cow-pregnancy/:farmerId", (req, res) => {
  const { farmerId } = req.params;

  const sql = `
    SELECT
      cpr.id,
      cpr.cow_id AS cowId,
      c.tag_number AS tagNumber,
      c.breed,
      cpr.status,
      cpr.pregnancy_start_date AS pregnancyStartDate,
      cpr.expected_calving_date AS expectedCalvingDate,
      cpr.calving_date AS calvingDate,
      cpr.calf_gender AS calfGender,
      cpr.notes
    FROM cow_pregnancy_records cpr
    INNER JOIN cows c
      ON cpr.cow_id = c.id
    INNER JOIN farmers f
      ON c.farmer_id = f.id
    WHERE f.farmer_id = ?
    ORDER BY cpr.id DESC
  `;

  db.query(sql, [farmerId], (err, results) => {
    if (err) {
      console.error(
        "❌ Fetch pregnancy records error:",
        err.message
      );

      return res.status(500).json({
        message: "Failed to fetch pregnancy records.",
      });
    }

    res.json({
      records: results,
    });
  });
});

// ==========================================
// ADD PREGNANCY RECORD
// ==========================================

app.post("/api/cow-pregnancy", (req, res) => {
  const {
    farmerId,
    cowId,
    status,
    pregnancyStartDate,
    expectedCalvingDate,
    calvingDate,
    calfGender,
    notes,
  } = req.body;

  if (!farmerId || !cowId || !status) {
    return res.status(400).json({
      message: "Required pregnancy details are missing.",
    });
  }

  const sql = `
    INSERT INTO cow_pregnancy_records
    (
      cow_id,
      status,
      pregnancy_start_date,
      expected_calving_date,
      calving_date,
      calf_gender,
      notes
    )
    SELECT
      c.id,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?
    FROM cows c
    INNER JOIN farmers f
      ON c.farmer_id = f.id
    WHERE c.id = ?
      AND f.farmer_id = ?
  `;

  db.query(
    sql,
    [
      status,
      pregnancyStartDate || null,
      expectedCalvingDate || null,
      calvingDate || null,
      calfGender || null,
      notes || "",
      Number(cowId),
      farmerId,
    ],
    (err, result) => {
      if (err) {
        console.error(
          "❌ Pregnancy insert error:",
          err.message
        );

        return res.status(500).json({
          message: "Failed to add pregnancy record.",
          error: err.message,
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          message:
            "Cow not found or does not belong to this farmer.",
        });
      }

      res.status(201).json({
        message:
          "Pregnancy record added successfully.",
        id: result.insertId,
      });
    }
  );
});
// GET MILK RECORDS BY FARMER
app.get("/api/milk-records/:farmerId", (req, res) => {
  const { farmerId } = req.params;

  const sql = `
    SELECT
      mr.id,
      mr.farmer_id,
      f.farmer_id AS farmerCode,
      f.name AS farmerName,
      mr.collection_date,
      mr.session,
      mr.quantity,
      mr.fat,
      mr.snf,
      mr.rate,
      mr.amount,
      mr.status,
      mr.payment_status,
      mr.created_at
    FROM milk_records mr
    JOIN farmers f
      ON mr.farmer_id = f.id
    WHERE f.farmer_id = ?
    ORDER BY mr.id DESC
  `;

  db.query(sql, [farmerId], (err, results) => {
    if (err) {
      console.error("Milk Records GET Error:", err);

      return res.status(500).json({
        message: "Failed to fetch milk records"
      });
    }

    res.json({
      records: results
    });
  });
});
// ==========================================
// ADD MILK RECORD
// ==========================================

app.post("/api/milk-records", (req, res) => {
  const {
    farmerId,
    collectionDate,
    session,
    quantity,
    fat,
    snf,
    rate,
    amount,
  } = req.body;

  if (
    !farmerId ||
    !collectionDate ||
    !session ||
    quantity === undefined ||
    fat === undefined ||
    snf === undefined ||
    rate === undefined ||
    amount === undefined
  ) {
    return res.status(400).json({
      message:
        "Required milk details are missing.",
    });
  }

  // Find internal farmer database ID
  const farmerSql = `
    SELECT id
    FROM farmers
    WHERE farmer_id = ?
  `;

  db.query(
    farmerSql,
    [farmerId],
    (farmerErr, farmerResults) => {
      if (farmerErr) {
        console.error(
          "❌ Farmer lookup error:",
          farmerErr.message
        );

        return res.status(500).json({
          message: "Failed to find farmer.",
          error: farmerErr.message,
        });
      }

      if (farmerResults.length === 0) {
        return res.status(404).json({
          message: "Farmer not found.",
        });
      }

      const farmerDbId =
        farmerResults[0].id;

      const milkSql = `
        INSERT INTO milk_records
        (
          farmer_id,
          collection_date,
          session,
          quantity,
          fat,
          snf,
          rate,
          amount,
          status,
          payment_status
        )
        VALUES (
          ?,
          ?,
          ?,
          ?,
          ?,
          ?,
          ?,
          ?,
          'Pending',
          'Unpaid'
        )
      `;

      const milkValues = [
        farmerDbId,
        collectionDate,
        session,
        Number(quantity),
        Number(fat),
        Number(snf),
        Number(rate),
        Number(amount),
      ];

      db.query(
        milkSql,
        milkValues,
        (milkErr, result) => {
          if (milkErr) {
            console.error(
              "❌ Milk insert error:",
              milkErr.message
            );

            return res.status(500).json({
              message:
                "Failed to save milk record.",
              error: milkErr.message,
            });
          }

          res.status(201).json({
            message:
              "Milk collection added successfully.",
            id: result.insertId,
          });
        }
      );
    }
  );
});
// ===============================
// FEED RECORDS
// ===============================

// GET Feed Records
// GET Feed Records
app.get("/api/feed-records/:farmerId", (req, res) => {
  const { farmerId } = req.params;

 
    const sql = `
  SELECT 
    fr.id,
    fr.farmer_id,
    fr.feed_name AS feedType,
    fr.feed_type AS feedCategory,
    fr.quantity,
    fr.unit,
    fr.cost,
    fr.supplier,
    fr.purchase_date AS date,
    f.farmer_id AS farmerCode,
    f.name AS farmerName
  FROM feed_records fr
  JOIN farmers f ON fr.farmer_id = f.id
  WHERE f.farmer_id = ?
  ORDER BY fr.id DESC
`;

  db.query(sql, [farmerId], (err, results) => {
    if (err) {
      console.error("Feed GET Error:", err);
      return res.status(500).json({
        message: "Failed to fetch feed records"
      });
    }

    res.json({
      records: results
    });
  });
});

// POST Feed Record
// POST Feed Record
app.post("/api/feed-records", (req, res) => {
  const {
    farmerId,
    feedName,
    feedType,
    quantity,
    unit,
    cost,
    supplier,
    purchaseDate
  } = req.body;

  if (!farmerId || !feedName || !quantity) {
    return res.status(400).json({
      message: "All feed fields are required"
    });
  }

  const farmerSql = `
    SELECT id
    FROM farmers
    WHERE farmer_id = ?
  `;

  db.query(farmerSql, [farmerId], (err, farmerResults) => {
    if (err) {
      console.error("Farmer lookup error:", err);
      return res.status(500).json({
        message: "Database error"
      });
    }

    if (farmerResults.length === 0) {
      return res.status(404).json({
        message: "Farmer not found"
      });
    }

    const internalFarmerId = farmerResults[0].id;

    const feedSql = `
      INSERT INTO feed_records
      (
        farmer_id,
        feed_name,
        feed_type,
        quantity,
        unit,
        cost,
        supplier,
        purchase_date
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
      feedSql,
      [
        internalFarmerId,
        feedName,
        feedType || null,
        Number(quantity),
        unit || "Kg",
        Number(cost) || 0,
        supplier || null,
        purchaseDate || null
      ],
      (err, result) => {
        if (err) {
          console.error("Feed INSERT Error:", err);
          return res.status(500).json({
            message: "Failed to add feed record"
          });
        }

        res.status(201).json({
          message: "Feed record added successfully",
          id: result.insertId
        });
      }
    );
  });
});
// =========================
// GET FEED USAGE
// =========================
app.get("/api/feed-usage/:farmerId", (req, res) => {
  const { farmerId } = req.params;

  const sql = `
    SELECT
      fu.id,
      fu.farmer_id,
      fu.feed_id,
      fu.usage_date,
      fu.quantity_used,
      fu.unit,
      fu.notes,
      fr.feed_type AS feedCategory,
      f.farmer_id AS farmerCode,
      f.name AS farmerName
    FROM feed_usage fu
    JOIN farmers f
      ON fu.farmer_id = f.id
    JOIN feed_records fr
      ON fu.feed_id = fr.id
    WHERE f.farmer_id = ?
    ORDER BY fu.id DESC
  `;

  db.query(sql, [farmerId], (err, results) => {
    if (err) {
      console.error("Feed Usage GET Error:", err);

      return res.status(500).json({
        message: "Failed to fetch feed usage records"
      });
    }

    res.json({
      records: results
    });
  });
});


// =========================
// POST FEED USAGE
// =========================
app.post("/api/feed-usage", (req, res) => {
  const {
    farmerId,
    feedId,
    usageDate,
    quantityUsed,
    unit,
    notes
  } = req.body;

  if (
    !farmerId ||
    !feedId ||
    !usageDate ||
    !quantityUsed
  ) {
    return res.status(400).json({
      message: "All feed usage fields are required"
    });
  }

  const farmerSql = `
    SELECT id
    FROM farmers
    WHERE farmer_id = ?
  `;

  db.query(
    farmerSql,
    [farmerId],
    (err, farmerResults) => {

      if (err) {
        console.error("Farmer lookup error:", err);

        return res.status(500).json({
          message: "Database error"
        });
      }

      if (farmerResults.length === 0) {
        return res.status(404).json({
          message: "Farmer not found"
        });
      }

      const internalFarmerId =
        farmerResults[0].id;

      const feedSql = `
        SELECT id
        FROM feed_records
        WHERE id = ?
          AND farmer_id = ?
      `;

      db.query(
        feedSql,
        [feedId, internalFarmerId],
        (err, feedResults) => {

          if (err) {
            console.error(
              "Feed lookup error:",
              err
            );

            return res.status(500).json({
              message: "Database error"
            });
          }

          if (feedResults.length === 0) {
            return res.status(404).json({
              message: "Feed record not found"
            });
          }

          const usageSql = `
            INSERT INTO feed_usage
            (
              farmer_id,
              feed_id,
              usage_date,
              quantity_used,
              unit,
              notes
            )
            VALUES (?, ?, ?, ?, ?, ?)
          `;

          db.query(
            usageSql,
            [
              internalFarmerId,
              feedId,
              usageDate,
              Number(quantityUsed),
              unit || "Kg",
              notes || null
            ],
            (err, result) => {

              if (err) {
                console.error(
                  "Feed Usage INSERT Error:",
                  err
                );

                return res.status(500).json({
                  message:
                    "Failed to add feed usage"
                });
              }

              res.status(201).json({
                message:
                  "Feed usage added successfully",
                id: result.insertId
              });
            }
          );
        }
      );
    }
  );
});

// ===============================
// INCOME RECORDS
// ===============================

// GET INCOME RECORDS
app.get("/api/income/:farmerId", (req, res) => {
  const { farmerId } = req.params;

  const sql = `
    SELECT
      ir.id,
      ir.farmer_id,
      f.farmer_id AS farmerCode,
      f.name AS farmerName,
      ir.income_type,
      ir.amount,
      ir.income_date,
      ir.description,
      ir.created_at
    FROM income_records ir
    JOIN farmers f
      ON ir.farmer_id = f.id
    WHERE f.farmer_id = ?
    ORDER BY ir.id DESC
  `;

  db.query(sql, [farmerId], (err, results) => {
    if (err) {
      console.error("Income GET Error:", err);

      return res.status(500).json({
        message: "Failed to fetch income records"
      });
    }

    res.json({
      records: results
    });
  });
});


// POST INCOME RECORD
app.post("/api/income", (req, res) => {
  const {
    farmerId,
    incomeType,
    amount,
    incomeDate,
    description
  } = req.body;

  if (
    !farmerId ||
    !incomeType ||
    !amount ||
    !incomeDate
  ) {
    return res.status(400).json({
      message: "All income fields are required"
    });
  }

  const farmerSql = `
    SELECT id
    FROM farmers
    WHERE farmer_id = ?
  `;

  db.query(
    farmerSql,
    [farmerId],
    (err, farmerResults) => {
      if (err) {
        console.error("Farmer lookup error:", err);

        return res.status(500).json({
          message: "Database error"
        });
      }

      if (farmerResults.length === 0) {
        return res.status(404).json({
          message: "Farmer not found"
        });
      }

      const internalFarmerId =
        farmerResults[0].id;

      const sql = `
        INSERT INTO income_records
        (
          farmer_id,
          income_type,
          amount,
          income_date,
          description
        )
        VALUES (?, ?, ?, ?, ?)
      `;

      db.query(
        sql,
        [
          internalFarmerId,
          incomeType,
          Number(amount),
          incomeDate,
          description || null
        ],
        (err, result) => {
          if (err) {
            console.error(
              "Income INSERT Error:",
              err
            );

            return res.status(500).json({
              message: "Failed to add income"
            });
          }

          res.status(201).json({
            message: "Income added successfully",
            id: result.insertId
          });
        }
      );
    }
  );
});
// ===============================
// EXPENSE RECORDS
// ===============================

// GET EXPENSE RECORDS
app.get("/api/expenses/:farmerId", (req, res) => {
  const { farmerId } = req.params;

  const sql = `
    SELECT
      er.id,
      er.farmer_id,
      f.farmer_id AS farmerCode,
      f.name AS farmerName,
      er.expense_type,
      er.amount,
      er.expense_date,
      er.description,
      er.created_at
    FROM expense_records er
    JOIN farmers f
      ON er.farmer_id = f.id
    WHERE f.farmer_id = ?
    ORDER BY er.id DESC
  `;

  db.query(sql, [farmerId], (err, results) => {
    if (err) {
      console.error("Expense GET Error:", err);

      return res.status(500).json({
        message: "Failed to fetch expense records"
      });
    }

    res.json({
      records: results
    });
  });
});


// POST EXPENSE RECORD
app.post("/api/expenses", (req, res) => {
  const {
    farmerId,
    expenseType,
    amount,
    expenseDate,
    description
  } = req.body;

  if (
    !farmerId ||
    !expenseType ||
    !amount ||
    !expenseDate
  ) {
    return res.status(400).json({
      message: "All expense fields are required"
    });
  }

  const farmerSql = `
    SELECT id
    FROM farmers
    WHERE farmer_id = ?
  `;

  db.query(
    farmerSql,
    [farmerId],
    (err, farmerResults) => {
      if (err) {
        console.error("Farmer lookup error:", err);

        return res.status(500).json({
          message: "Database error"
        });
      }

      if (farmerResults.length === 0) {
        return res.status(404).json({
          message: "Farmer not found"
        });
      }

      const internalFarmerId =
        farmerResults[0].id;

      const sql = `
        INSERT INTO expense_records
        (
          farmer_id,
          expense_type,
          amount,
          expense_date,
          description
        )
        VALUES (?, ?, ?, ?, ?)
      `;

      db.query(
        sql,
        [
          internalFarmerId,
          expenseType,
          Number(amount),
          expenseDate,
          description || null
        ],
        (err, result) => {
          if (err) {
            console.error(
              "Expense INSERT Error:",
              err
            );

            return res.status(500).json({
              message: "Failed to add expense"
            });
          }

          res.status(201).json({
            message: "Expense added successfully",
            id: result.insertId
          });
        }
      );
    }
  );
});

// VERIFY MILK RECORD
app.put("/api/milk-records/:id/verify", (req, res) => {
  const { id } = req.params;

  const sql = `
    UPDATE milk_records
    SET status = 'Verified'
    WHERE id = ?
  `;

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Milk Verification Error:", err);

      return res.status(500).json({
        message: "Failed to verify milk record",
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Milk record not found",
      });
    }

    res.json({
      message: "Milk record verified successfully",
    });
  });
});
app.put("/api/milk-records/:id/reject", (req, res) => {
  const { id } = req.params;

  const sql = `
    UPDATE milk_records
    SET status = 'Rejected'
    WHERE id = ?
  `;

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Milk Rejection Error:", err);
      return res.status(500).json({
        message: "Failed to reject milk record",
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Milk record not found",
      });
    }

    res.json({
      message: "Milk record rejected successfully",
    });
  });
});
// ==========================================
// GET ALL MILK RECORDS FOR DAIRY
// ==========================================

app.get("/api/milk-records", (req, res) => {
  const sql = `
    SELECT
      m.id,
      m.farmer_id,
      f.farmer_id AS farmerCode,
      f.name AS farmerName,
      f.mobile,
      m.collection_date,
      m.session,
      m.quantity,
      m.fat,
      m.snf,
      m.rate,
      m.amount,
      m.status,
      m.payment_status,
      m.created_at
    FROM milk_records m
    INNER JOIN farmers f
      ON m.farmer_id = f.id
    ORDER BY m.collection_date DESC, m.id DESC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error(
        "All Milk Records Error:",
        err
      );

      return res.status(500).json({
        message: "Failed to load milk records",
      });
    }

    res.json({
      records: results,
    });
  });
});
// ===============================
// DAIRY DASHBOARD
// ===============================
app.get("/api/dairy/dashboard", (req, res) => {
  const sql = `
    SELECT
      (SELECT COUNT(*) FROM farmers) AS totalFarmers,

      (
        SELECT COALESCE(SUM(quantity), 0)
        FROM milk_records
        WHERE status = 'Verified'
        AND collection_date = CURDATE()
      ) AS todayMilk,

      (
        SELECT COUNT(*)
        FROM milk_records
        WHERE status = 'Pending'
      ) AS pendingVerification,

      (
        SELECT COALESCE(SUM(amount), 0)
        FROM milk_records
        WHERE status = 'Verified'
      ) AS totalPayments
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Dairy Dashboard Error:", err);

      return res.status(500).json({
        message: "Failed to load dairy dashboard data",
      });
    }

    res.json({
      totalFarmers: Number(results[0].totalFarmers || 0),
      todayMilk: Number(results[0].todayMilk || 0),
      pendingVerification: Number(
        results[0].pendingVerification || 0
      ),
      totalPayments: Number(
        results[0].totalPayments || 0
      ),
    });
  });
});
// ==========================================
// START SERVER
// ==========================================

app.listen(PORT, () => {
  console.log(
    `🚀 Server running on http://localhost:${PORT}`
  );
});