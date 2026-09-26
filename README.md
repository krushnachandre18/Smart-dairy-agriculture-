# 🐄 Smart Dairy & Farmer Farm Management System

A modern web-based management system designed to manage **dairy cooperative operations and farmer farm activities** in one integrated platform.

The system helps dairy staff and farmers manage milk collection, payments, cows, feed, health, pregnancy, income, expenses, reports, and other farm-related activities.

---

## 📌 Project Overview

The **Smart Dairy & Farmer Farm Management System** provides two main user modules:

### 🏢 Dairy Module
Used by dairy/in-charge staff to manage:

- Farmer registration
- Milk collection
- Milk verification
- Milk payments
- Daily reports
- Dairy dashboard
- Center settings
- Farmer management

### 👨‍🌾 Farmer Module
Used by farmers to manage:

- Farmer profile
- Cow management
- Milk collection records
- Milk production
- Health & vaccination
- Pregnancy & calving
- Feed management
- Income management
- Expense management
- Financial management
- Reports

---

## 🎯 Objectives

The main objectives of this project are:

- To digitize dairy and farm management activities.
- To maintain farmer information in a centralized database.
- To record daily milk collection digitally.
- To calculate milk rates and payments.
- To provide farmer-wise milk records.
- To manage cows and their health information.
- To manage feed usage and expenses.
- To track income and expenses.
- To calculate overall financial performance.
- To provide separate access for Dairy and Farmer users.
- To reduce manual paperwork and calculation errors.

---

## ✨ Key Features

### 🔐 Authentication

- Farmer Login
- Dairy Login
- Farmer Registration
- Role-based navigation
- Farmer-specific data access

### 🥛 Milk Collection

- Morning and Evening milk collection
- Quantity entry
- Fat entry
- SNF entry
- Automatic rate calculation
- Automatic amount calculation
- Duplicate collection validation
- Farmer-wise milk records

### ✅ Milk Verification

- View pending milk records
- Verify milk collection
- Reject milk collection
- Track verification status

### 💰 Milk Payments

- View verified milk records
- Payment amount
- Payment status
- Payment date
- Farmer-wise payment information

### 🐄 Cow Management

- Add new cow
- View cows
- Cow tag number
- Breed
- Age
- Purchase date
- Cow status
- Milk production records

### 💉 Health & Vaccination

- Vaccination records
- Vaccination date
- Next due date
- Health status
- Health notes

### 🤰 Pregnancy & Calving

- Pregnancy status
- Pregnancy start date
- Expected calving date
- Calving date
- Calf gender
- Additional notes

### 🌾 Feed Management

- Feed types
- Feed stock
- Feed quantity
- Feed suppliers
- Feed purchase records
- Daily feed usage
- Feed expenses

### 💵 Financial Management

- Income management
- Expense management
- Dairy payments
- Feed expenses
- Total income
- Total expenses
- Net profit/loss

### 📊 Reports

- Daily dairy reports
- Farmer reports
- Milk collection reports
- Payment information
- Financial information

### ⚙️ Center Settings

- Dairy center information
- In-charge information
- Mobile number
- Village
- Address
- Milk rate
- Dairy login credentials

### 🤖 AI Chatbot

The system also includes an AI chatbot interface designed to provide assistance within the application.

---

## 🏗️ System Architecture

```text
                    SMART DAIRY SYSTEM
                           |
            ┌──────────────┴──────────────┐
            |                             |
       DAIRY MODULE                 FARMER MODULE
            |                             |
   ┌────────┼─────────┐          ┌────────┼─────────┐
   |        |         |          |        |         |
Farmer   Milk      Payment      Cows     Feed    Finance
Mgmt.   Collection                  |
   |        |         |             ├── Health
   |    Verification                └── Pregnancy
   |
Reports & Settings
            |
            └──────────┬──────────┘
                       |
                  MySQL Database
                       |
                  Node.js API
                       |
                 React Frontend
