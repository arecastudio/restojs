# RestoJs 3.0

[jQuery](https://jquery.com/) — New Wave JavaScript
==================================================

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fjquery%2Fjquery.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fjquery%2Fjquery?ref=badge_shield)

[![Gitter](https://badges.gitter.im/jquery/jquery.svg)](https://gitter.im/jquery/jquery?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)

## Project Description
This application is an updated version to replace an old one I built several years ago. There is some upgrading functions or features for each modules which modified to give the user some more abilities to control and maintain the data for some proper informations. Its repository only contained the front-end of the application regarding while the rest of back-end part will only post as reqest.

## Preview
![screenshoot](img1.png)
![screenshoot2](img2.png)

## TODO
### Detail Progress of Each Frontend Modules
- [x] Beranda 
- [x] Master - Data Meja
- [x] Master - Kategori Meja
- [x] Master - Daftar Menu
- [x] Master - Ketegori Menu
- [x] Master - Pembayaran Non-Tunai
- [x] Master - Menu Tambahan
- [x] Penjualan - Pemesanan
- [x] Penjualan - Pelunasan
- [x] Penjualan - Cetak Ulang Pelunasan
- [x] Penjualan - Cetak Ulang Order Meja
- [x] Penjualan - Pemesanan Langsung
- [x] Dapur - Status Pemesanan
- [x] Dapur - Antrian Dapur
- [x] Tool - Batal Meja
- [x] Tool - Batal Pelunasan
- [x] Tool - Ubah Pesanan
- [x] Tool - Singkronisasi Pembayaran
- [x] Laporan - Pemasukan Hari Ini
- [x] Laporan - Laporan Bulanan
- [x] Laporan - Laporan Pajak
- [x] Pengaturan - Data Pengguna
- [x] Pengaturan - Hak Akses
- [x] Pengaturan - Biaya Lain
- [x] Pengaturan - Histori Batal
- [x] Pengaturan - Ubah Order
- [x] Login User

## Post Released Update
### Some enhancements according to situations after its product applied
- [x] Set color animation for Dapur - Antrian Dapur
- [x] Modify Laporan Kasir to Menu Baru replace on Pengaturan
- [x] Add top-button categories on mobile app Restodapur - Dashboard
- [x] Add filter Data Menu
- [x] Set kitchen display separately in particularly for food-order and drink-order then applied in mobile app
- [x] New menu-order on exists order-list should be put seperately on new list bellow the current one
- [ ] Add a supervision menu on Tool - Ubah Pesanan
- [ ] Add an order-number of the day
- [ ] Add an unit Test (PHPUnit,Jest)

### OrderSys Mobile App
- [x] DashboardDetail - Search by name
- [x] DashboardDetail - SearchButton click on empty key call reset menulist
- [x] DashboardDetail - Styling modal first order-count and packaging confirmation
- [x] DashboardDetail - ListOrder confirmation delete item function
- [x] DashboardDetail - LastOrder History shown in modal format

### Database structure update(s):
- table: tutup-meja-pesanan: add-fields: uuid,catatan. modify-field: remove auto_increment on ID then reset all data to zero
- table: hapus-pesanan-detail: create like detail. No primary key, drop it. Add meja_nomor

## Log(s)
- Template decoreated for Kitchen Ordered Menu Screen
- Add a simple module for Cashier's daily report
- Update the input method for tax report
- Adding another report for online dataset
- Discount feature added into payment module
- Row added on each reports to show summary of income
- Estimated order time was added for urgent classification
- Update database, add new field: role->tool_pindah_meja on top of tool_batalkan_meja. Make sure to update the running database on client's machine
- Then, according to the previous log, lock the tutup-meja-kosong menu
- Mobile-app item-search feature has been applied well
- Kitchen screen only show food-order
- Finishing frontend section
- Login layout for waitress already fixed, each order sent to kitchen will bear each person information for accountability