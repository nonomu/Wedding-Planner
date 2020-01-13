# We Do

We Do is a wedding management platform built with react. It includes vendor recommendations, budget tracker, profile management and guest management.

## Contributors
- Noam Mualmi(nonomu)
- Ron Braha(RNR1)
- Yaniv Sultan(yanivsultan)
- Guy Dahan(GuyDahn)
- Ori Tsadok(oritsadok)


## Table Of Contents
- [We Do](#we-do)
  - [Contributors](#contributors)
  - [Table Of Contents](#table-of-contents)
  - [Running the project](#running-the-project)
  - [Screenshots](#screenshots)
    - [Home](#home)
    - [Register](#register)
    - [Login](#login)
    - [Profile](#profile)
    - [Vendors](#vendors)
    - [Favorites](#favorites)
    - [Vendor info](#vendor-info)
    - [Book vendor](#book-vendor)
    - [Budget tracker](#budget-tracker)
    - [Guest management](#guest-management)
    - [Add table](#add-table)
    - [Table management](#table-management)
  - [Tech-stack](#tech-stack)

## Running the project
1. Clone the repo.
2. Run `npm install`.
3. Run `node server.js`.
4. Run `mysql`.
5. Navigate to `http://localhost:3000`.

## Screenshots

### Home
A short introduction, you can navigate to registration or login form via the navigation bar
<p align="center"><img src="assets/home.png" width="300" /></p>

### Register
Registration form. you can input your personal information and wedding information
<p align="center"><img src="assets/register.png" width="300" /></p>

### Login
<p align="center"><img src="assets/login.png" width="300" /></p>

### Profile
Update and view your profile information.
<p align="center"><img src="assets/profile.png" width="300" /></p>

### Vendors
Get vendor recommendations, add vendors to your favorites, book vendor for your wedding, clicking a vendor will redirect to a more detailed dialog box.
<p align="center"><img src="assets/vendors.png" width="300" /></p>

### Favorites
View your favorite vendors in one place
<p align="center"><img src="assets/favorites.png" width="300" /></p>

### Vendor info
<p align="center"><img src="assets/vendor-info.png" width="300" /></p>

### Book vendor
Vendor booking screen, you have to input the price you paid for that vendor so it would be added to your budget tracker.
<p align="center"><img src="assets/book-vendor.png" width="300" /></p>

### Budget tracker
Get an overview of all your booked vendors for the wedding, check your Total budget and how much you spent already.
<p align="center"><img src="assets/budget-tracker.png" width="300" /></p>

### Guest management
Manage your guest list for the wedding, clicking the + button will open a dialog box for adding a new table, so you could manage your table setting. 
<p align="center"><img src="assets/guest-management.png" width="300" /></p>

### Add table
<p align="center"><img src="assets/add-table.png" width="300" /></p>

### Table management
Add or remove guests from your table.
<p align="center"><img src="assets/table-management.png" width="300" /></p>

## Tech-stack
1. React, MobX, Material-UI, React-Toastify and Axios.
2. Express (Node.js), Sequelize (MySQL), bcrypt.