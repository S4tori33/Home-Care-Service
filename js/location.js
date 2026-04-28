// Location form validation and navigation
document.addEventListener('DOMContentLoaded', function() {
    const locationForm = document.getElementById('locationForm');
    const confirmButton = document.getElementById('confirmButton');

    // Modal elements
    const bookingModal = document.getElementById('bookingModal');
    const bookingModalClose = document.getElementById('bookingModalClose');
    const editBookingBtn = document.getElementById('editBooking');
    const finalizeBookingBtn = document.getElementById('finalizeBooking');

    const cityMunicipality = document.getElementById('cityMunicipality');
    const barangayInput = document.getElementById('barangayInput');
    const barangaySelect = document.getElementById('barangaySelect');

    const barangaysByCity = {
        'zamboanga city': [
            'Arena Blanco', 'Ayala', 'Baliwasan', 'Baluno', 'Barangay Zone I', 'Barangay Zone II', 'Barangay Zone III', 'Barangay Zone IV', 'Boalan', 'Bolong', 'Buenavista', 'Bunguiao', 'Busay', 'Cabaluay', 'Cabatangan', 'Cacao', 'Calabasa', 'Calarian', 'Camino Nuevo', 'Campo Islam', 'Canelar', 'Capisan', 'Cawit', 'Culianan', 'Curuan', 'Dita', 'Divisoria', 'Dulian (Upper Bunguiao)', 'Dulian (Upper Pasonanca)', 'Guisao', 'Guiwan', 'Kasanyangan', 'La Paz', 'Labuan', 'Lamisahan', 'Landang Gua', 'Landang Laum', 'Lanzones', 'Lapakan', 'Latuan', 'Licomo', 'Limaong', 'Limpapa', 'Lubigan', 'Lumayang', 'Lumbangan', 'Lunzuran', 'Maasin', 'Malagutay', 'Mampang', 'Manalipa', 'Mangusu', 'Manicahan', 'Mariki', 'Mercedes', 'Muti', 'Pamucutan', 'Pangapuyan', 'Panubigan', 'Pasilmanta', 'Pasobolong', 'Pasonanca', 'Patalon', 'Putik', 'Quiniput', 'Recodo', 'Rio Hondo', 'Salaan', 'San Jose Cawa-cawa', 'San Jose Gusu', 'San Roque', 'Sangali', 'Santa Barbar', 'Santa Catalina', 'Santa Maria', 'Santo Niño', 'Sibulao', 'Sinubung', 'Sinunoc', 'Tagasilay', 'Taguiti', 'Talabaan', 'Talisayan', 'Talon-talon', 'Taluksangay', 'Tetuan', 'Tictapul', 'Tigbalabag', 'Tigtabon', 'Tolosa', 'Tugbungan', 'Tulungatung', 'Tumaga', 'Tumalutab', 'Tumitus', 'Victoria', 'Vitali', 'Zambowood'
        ],
        'zamboanga del norte': [
            'Alegria, Baliguian', 'Diangas, Baliguian', 'Diculom, Baliguian', 'Guimotan, Baliguian', 'Kauswagan, Baliguian', 'Kilalaban, Baliguian', 'Linay, Baliguian', 'Lumay, Baliguian', 'Malinao, Baliguian', 'Mamad, Baliguian', 'Mamawan, Baliguian', 'Milidan, Baliguian', 'Nonoyan, Baliguian', 'Poblacion, Baliguian', 'San Jose, Baliguian', 'Tamao, Baliguian', 'Tan-awan, Baliguian', 'Aliguay, Dapitan', 'Antipolo, Dapitan', 'Aseniero, Dapitan', 'Ba-ao, Dapitan', 'Bagting, Dapitan', 'Banbanan, Dapitan', 'Banonong, Dapitan', 'Barcelona, Dapitan', 'Baylimango, Dapitan', 'Burgos, Dapitan', 'Canlucani, Dapitan', 'Carang, Dapitan', 'Cawa-cawa, Dapitan', 'Dampalan, Dapitan', 'Daro, Dapitan', 'Dawo, Dapitan', 'Diwa-an, Dapitan', 'Guimputlan, Dapitan', 'Hilltop, Dapitan', 'Ilaya, Dapitan', 'Kauswagan, Dapitan', 'Larayan, Dapitan', 'Linabo, Dapitan', 'Liyang, Dapitan', 'Maria Cristina, Dapitan', 'Maria Uray, Dapitan', 'Masidlakon, Dapitan', 'Matagobtob Poblacion, Dapitan', 'Napo, Dapitan', 'Opao, Dapitan', 'Oro, Dapitan', 'Owaon, Dapitan', 'Oyan, Dapitan', 'Polo, Dapitan', 'Potol, Dapitan', 'Potungan, Dapitan', 'San Francisco, Dapitan', 'San Nicolas, Dapitan', 'San Pedro, Dapitan', 'San Vicente, Dapitan', 'Santa Cruz, Dapitan', 'Santo Niño, Dapitan', 'Selinog, Dapitan', 'Sicayab-Bucana, Dapitan', 'Sigayan, Dapitan', 'Sinonoc, Dapitan', 'Sulangon, Dapitan', 'Tag-ulo, Dapitan', 'Taguilon, Dapitan', 'Tamion, Dapitan', 'Barra, Dipolog', 'Biasong, Dipolog', 'Central, Dipolog', 'Cogon, Dipolog', 'Dicayas, Dipolog', 'Diwan, Dipolog', 'Estaca, Dipolog', 'Galas, Dipolog', 'Gulayon, Dipolog', 'Lugdungan, Dipolog', 'Minaog, Dipolog', 'Miputak, Dipolog', 'Olingan, Dipolog', 'Punta, Dipolog', 'San Jose, Dipolog', 'Sangkol, Dipolog', 'Santa Filomena, Dipolog', 'Santa Isabel, Dipolog', 'Sicayab, Dipolog', 'Sinaman, Dipolog', 'Turno, Dipolog', 'Baluno, Godod', 'Banuangan, Godod', 'Bunawan, Godod', 'Dilucot, Godod', 'Dipopor, Godod', 'Guisapong, Godod', 'Limbonga, Godod', 'Lomogom, Godod', 'Mauswagon, Godod', 'Miampic, Godod', 'Poblacion, Godod', 'Raba, Godod', 'Rambon, Godod', 'San Pedro, Godod', 'Sarawagan, Godod', 'Sianan, Godod', 'Sioran, Godod', 'Bacong, Gutalac', 'Bagong Silang, Gutalac', 'Banganon, Gutalac', 'Bayanihan, Gutalac', 'Buenavista, Gutalac', 'Canupong, Gutalac', 'Cocob, Gutalac', 'Datagan, Gutalac', 'Imelda, Gutalac', 'Immaculada Concepcion, Gutalac', 'La Libertad, Gutalac', 'Loay, Gutalac', 'Lower Lux, Gutalac', 'Lux, Gutalac', 'Malian, Gutalac', 'Mamawan, Gutalac', 'Map, Gutalac', 'Matunoy, Gutalac', 'New Dapitan, Gutalac', 'Panganuran, Gutalac', 'Pitawe, Gutalac', 'Pitogo, Gutalac', 'Poblacion, Gutalac', 'Salvador, Gutalac', 'San Isidro, Gutalac', 'San Juan, Gutalac', 'San Roque, Gutalac', 'San Vicente, Gutalac', 'Santo Niño, Gutalac', 'Sas, Gutalac', 'Sibalic, Gutalac', 'Tipan, Gutalac', 'Upper Gutalac, Gutalac', 'Balatakan, Jose Dalman', 'Bitoon, Jose Dalman', 'Dinasan, Jose Dalman', 'Ilihan, Jose Dalman', 'Labakid, Jose Dalman', 'Lipay, Jose Dalman', 'Litalip, Jose Dalman', 'Lopero, Jose Dalman', 'Lumanping, Jose Dalman', 'Madalag, Jose Dalman', 'Manawan, Jose Dalman', 'Marupay, Jose Dalman', 'Poblacion, Jose Dalman', 'Sigamok, Jose Dalman', 'Siparok, Jose Dalman', 'Tabon, Jose Dalman', 'Tamarok, Jose Dalman', 'Tamil, Jose Dalman', 'Batayan, Kalawit', 'Botong, Kalawit', 'Concepcion, Kalawit', 'Daniel Maing, Kalawit', 'Fatima, Kalawit', 'Gatas, Kalawit', 'Kalawit, Kalawit', 'Marcelo, Kalawit', 'New Calamba, Kalawit', 'Palalian, Kalawit', 'Paraiso, Kalawit', 'Pianon, Kalawit', 'San Jose, Kalawit', 'Tugop, Kalawit', 'Balok, Katipunan', 'Barangay Dos, Katipunan', 'Barangay Uno, Katipunan', 'Basagan, Katipunan', 'Biniray, Katipunan', 'Bulawan, Katipunan', 'Carupay, Katipunan', 'Daanglungsod, Katipunan', 'Dabiak, Katipunan', 'Dr. Jose Rizal, Katipunan', 'Fimagas, Katipunan', 'Loyuran, Katipunan', 'Malasay, Katipunan', 'Malugas, Katipunan', 'Matam, Katipunan', 'Mias, Katipunan', 'Miatan, Katipunan', 'Nanginan, Katipunan', 'New Tambo, Katipunan', 'Patik, Katipunan', 'San Antonio, Katipunan', 'San Vicente, Katipunan', 'Sanao, Katipunan', 'Santo Niño, Katipunan', 'Seres, Katipunan', 'Seroan, Katipunan', 'Singatong, Katipunan', 'Sinuyak, Katipunan', 'Sitog, Katipunan', 'Tuburan, Katipunan', 'El Paraiso, La Libertad', 'La Union, La Libertad', 'La Victoria, La Libertad', 'Mauswagon, La Libertad', 'Mercedes, La Libertad', 'New Argao, La Libertad', 'New Bataan, La Libertad', 'New Carcar, La Libertad', 'Poblacion, La Libertad', 'San Jose, La Libertad', 'Santa Catalina, La Libertad', 'Santa Cruz, La Libertad', 'Singaran, La Libertad', 'Antonino, Labason', 'Balas, Labason', 'Bobongan, Labason', 'Dansalan, Labason', 'Gabu, Labason', 'Gil Sanchez, Labason', 'Imelda, Labason', 'Immaculada, Labason', 'Kipit, Labason', 'La Union, Labason', 'Lapatan, Labason', 'Lawagan, Labason', 'Lawigan, Labason', 'Lopoc, Labason', 'Malintuboan, Labason', 'New Salvacion, Labason', 'Osukan, Labason', 'Patawag, Labason', 'San Isidro, Labason', 'Ubay, Labason', 'Bacungan, Leon B. Postigo', 'Bogabongan, Leon B. Postigo', 'Delusom, Leon B. Postigo', 'Mangop, Leon B. Postigo', 'Manil, Leon B. Postigo', 'Mawal, Leon B. Postigo', 'Midatag, Leon B. Postigo', 'Morob, Leon B. Postigo', 'Nasibac, Leon B. Postigo', 'Rizon, Leon B. Postigo', 'Santa Maria, Leon B. Postigo', 'Sipacong, Leon B. Postigo', 'Talinga, Leon B. Postigo', 'Tinaplan, Leon B. Postigo', 'Tiniguiban, Leon B. Postigo', 'Tinuyop, Leon B. Postigo', 'Tiogan, Leon B. Postigo', 'Titik, Leon B. Postigo', 'Banigan, Liloy', 'Baybay, Liloy', 'Cabangcalan, Liloy', 'Canaan, Liloy', 'Candelaria, Liloy', 'Causwagan, Liloy', 'Communal, Liloy', 'Compra, Liloy', 'Dela Paz, Liloy', 'El Paraiso, Liloy', 'Fatima, Liloy', 'Ganase, Liloy', 'Goaw, Liloy', 'Goin, Liloy', 'Kayok, Liloy', 'La Libertad, Liloy', 'Lamao, Liloy', 'Mabuhay, Liloy', 'Maigang, Liloy', 'Malila, Liloy', 'Mauswagon, Liloy', 'New Bethlehem, Liloy', 'Overview, Liloy', 'Panabang, Liloy', 'Patawag, Liloy', 'Punta, Liloy', 'San Francisco, Liloy', 'San Isidro, Liloy', 'San Miguel, Liloy', 'San Roque, Liloy', 'Santa Cruz, Liloy', 'Santo Niño, Liloy', 'Silucap, Liloy', 'Tapican, Liloy', 'Timan, Liloy', 'Villa Calixto Sudiacal, Liloy', 'Villa M. Tejero, Liloy', 'Dipane, Manukan', 'Disakan, Manukan', 'Don Jose Aguirre, Manukan', 'East Poblacion, Manukan', 'Gupot, Manukan', 'Libuton, Manukan', 'Linay, Manukan', 'Lingatongan, Manukan', 'Lupasang, Manukan', 'Mate, Manukan', 'Meses, Manukan', 'Palaranan, Manukan', 'Pangandao, Manukan', 'Patagan, Manukan', 'Poblacion, Manukan', 'Punta Blanca, Manukan', 'Saluyong, Manukan', 'San Antonio, Manukan', 'Serongan, Manukan', 'Suisayan, Manukan', 'Upper Disakan, Manukan', 'Villaramos, Manukan', 'Alvenda, Mutia', 'Buenasuerte, Mutia', 'Diland, Mutia', 'Diolen, Mutia', 'Head Tipan, Mutia', 'New Casul, Mutia', 'New Siquijor, Mutia', 'Newland, Mutia', 'Paso Rio, Mutia', 'Poblacion, Mutia', 'San Miguel, Mutia', 'Santo Tomas, Mutia', 'Tinglan, Mutia', 'Totongon, Mutia', 'Tubac, Mutia', 'Unidos, Mutia', 'Adante, Piñan', 'Bacuyong, Piñan', 'Bagong Silang, Piñan', 'Calican, Piñan', 'Del Pilar, Piñan', 'Desin, Piñan', 'Dilawa, Piñan', 'Dionum, Piñan', 'Lapu-lapu, Piñan', 'Lower Gumay, Piñan', 'Luzvilla, Piñan', 'Poblacion North, Piñan', 'Poblacion South, Piñan', 'Santa Fe, Piñan', 'Segabe, Piñan', 'Sikitan, Piñan', 'Silano, Piñan', 'Teresita, Piñan', 'Tinaytayan, Piñan', 'Ubay, Piñan', 'Upper Gumay, Piñan', 'Villarico, Piñan', 'Anastacio, Polanco', 'Bandera, Polanco', 'Bethlehem, Polanco', 'Dangi, Polanco', 'Dansullan, Polanco', 'De Venta Perla, Polanco', 'Guinles, Polanco', 'Isis, Polanco', 'Labrador, Polanco', 'Lapayanbaja, Polanco', 'Letapan, Polanco', 'Linabo, Polanco', 'Lingasad, Polanco', 'Macleodes, Polanco', 'Magangon, Polanco', 'Maligaya, Polanco', 'Milad, Polanco', 'New Lebangon, Polanco', 'New Sicayab, Polanco', 'Obay, Polanco', 'Pian, Polanco', 'Poblacion North, Polanco', 'Poblacion South, Polanco', 'San Antonio, Polanco', 'San Miguel, Polanco', 'San Pedro, Polanco', 'Santo Niño, Polanco', 'Sianib, Polanco', 'Silawe, Polanco', 'Villahermosa, Polanco', 'Balubo, President Manuel A. Roxas', 'Banbanan, President Manuel A. Roxas', 'Canibongan, President Manuel A. Roxas', 'Capase, President Manuel A. Roxas', 'Cape, President Manuel A. Roxas', 'Denoman, President Manuel A. Roxas', 'Dohinob, President Manuel A. Roxas', 'Galokso, President Manuel A. Roxas', 'Gubat, President Manuel A. Roxas', 'Irasan, President Manuel A. Roxas', 'Labakid, President Manuel A. Roxas', 'Langatian, President Manuel A. Roxas', 'Lipakan, President Manuel A. Roxas', 'Marupay, President Manuel A. Roxas', 'Moliton, President Manuel A. Roxas', 'Nabilid, President Manuel A. Roxas', 'Panampalay, President Manuel A. Roxas', 'Pangologon, President Manuel A. Roxas', 'Piao, President Manuel A. Roxas', 'Piñalan, President Manuel A. Roxas', 'Piñamar, President Manuel A. Roxas', 'Pongolan, President Manuel A. Roxas', 'Salisig, President Manuel A. Roxas', 'Sebod, President Manuel A. Roxas', 'Sibatog, President Manuel A. Roxas', 'Situbo, President Manuel A. Roxas', 'Tanayan, President Manuel A. Roxas', 'Tantingon, President Manuel A. Roxas', 'Upper Irasan, President Manuel A. Roxas', 'Upper Minang, President Manuel A. Roxas', 'Villahermoso, President Manuel A. Roxas', 'Balubohan, Rizal', 'Birayan, Rizal', 'Damasing, Rizal', 'East Poblacion, Rizal', 'La Esperanza, Rizal', 'Mabuhay, Rizal', 'Mabunao, Rizal', 'Mitimos, Rizal', 'Nangca, Rizal', 'Nangcaan, Rizal', 'Napilan, Rizal', 'Nasipang, Rizal', 'New Dapitan, Rizal', 'Nilabo, Rizal', 'North Mapang, Rizal', 'Rizalina, Rizal', 'San Roque, Rizal', 'Sebaca, Rizal', 'Sipaon, Rizal', 'South Mapang, Rizal', 'Tolon, Rizal', 'West Poblacion, Rizal', 'Bacong, Salug', 'Balakan, Salug', 'Binoni, Salug', 'Calucap, Salug', 'Canawan, Salug', 'Caracol, Salug', 'Danao, Salug', 'Dinoan, Salug', 'Dipolod, Salug', 'Fatima, Salug', 'Ipilan, Salug', 'Lanawan, Salug', 'Liguac, Salug', 'Lipakan, Salug', 'Mucas, Salug', 'Pacuhan, Salug', 'Poblacion, Salug', 'Poblacion East, Salug', 'Pukay, Salug', 'Ramon Magsaysay, Salug', 'Santo Niño, Salug', 'Tambalang, Salug', 'Tapalan, Salug', 'Antonino, Sergio Osmeña Sr.', 'Bagong Baguio, Sergio Osmeña Sr.', 'Bagumbayan, Sergio Osmeña Sr.', 'Biayon, Sergio Osmeña Sr.', 'Buenavista, Sergio Osmeña Sr.', 'Dampalan, Sergio Osmeña Sr.', 'Danao, Sergio Osmeña Sr.', 'Don Eleno, Sergio Osmeña Sr.', 'Kauswagan, Sergio Osmeña Sr.', 'Labiray, Sergio Osmeña Sr.', 'Liwanag, Sergio Osmeña Sr.', 'Mabuhay, Sergio Osmeña Sr.', 'Macalibre, Sergio Osmeña Sr.', 'Mahayahay, Sergio Osmeña Sr.', 'Marapong, Sergio Osmeña Sr.', 'Nazareth, Sergio Osmeña Sr.', 'Nebo, Sergio Osmeña Sr.', 'New Rizal, Sergio Osmeña Sr.', 'New Tangub, Sergio Osmeña Sr.', 'Nuevavista, Sergio Osmeña Sr.', 'Pedagan, Sergio Osmeña Sr.', 'Penacio, Sergio Osmeña Sr.', 'Poblacion Alto, Sergio Osmeña Sr.', 'Poblacion Bajo, Sergio Osmeña Sr.', 'Princesa Freshia, Sergio Osmeña Sr.', 'Princesa Lamaya, Sergio Osmeña Sr.', 'San Antonio, Sergio Osmeña Sr.', 'San Francisco, Sergio Osmeña Sr.', 'San Isidro, Sergio Osmeña Sr.', 'San Jose, Sergio Osmeña Sr.', 'San Juan, Sergio Osmeña Sr.', 'Sinaad, Sergio Osmeña Sr.', 'Sinai, Sergio Osmeña Sr.', 'Situbo, Sergio Osmeña Sr.', 'Tinago, Sergio Osmeña Sr.', 'Tinindugan, Sergio Osmeña Sr.', 'Tuburan, Sergio Osmeña Sr.', 'Venus, Sergio Osmeña Sr.', 'Wilben, Sergio Osmeña Sr.', 'Balok, Siayan', 'Balunokan, Siayan', 'Datagan, Siayan', 'Denoyan, Siayan', 'Diongan, Siayan', 'Domogok, Siayan', 'Dumpilas, Siayan', 'Gonayen, Siayan', 'Guibo, Siayan', 'Gunyan, Siayan', 'Litolet, Siayan', 'Macasing, Siayan', 'Mangilay, Siayan', 'Moyo, Siayan', 'Muñoz, Siayan', 'Pange, Siayan', 'Paranglumba, Siayan', 'Polayo, Siayan', 'Sayaw, Siayan', 'Seriac, Siayan', 'Siayan Proper, Siayan', 'Suguilon, Siayan', 'Anongan, Sibuco', 'Basak, Sibuco', 'Bongalao, Sibuco', 'Cabbunan, Sibuco', 'Cawit-cawit, Sibuco', 'Culaguan, Sibuco', 'Cusipan, Sibuco', 'Dinulan, Sibuco', 'Jatian, Sibuco', 'Kamarangan, Sibuco', 'Lakiki, Sibuco', 'Lambagoan, Sibuco', 'Limpapa, Sibuco', 'Lingayon, Sibuco', 'Lintangan, Sibuco', 'Litawan, Sibuco', 'Lunday, Sibuco', 'Malayal, Sibuco', 'Mantivo, Sibuco', 'Nala, Sibuco', 'Panganuran, Sibuco', 'Pangian, Sibuco', 'Paniran, Sibuco', 'Pasilnahut, Sibuco', 'Poblacion, Sibuco', 'Puliran, Sibuco', 'Santo Niño, Sibuco', 'Tangarak, Sibuco', 'Bagacay, Sibutad', 'Calilic, Sibutad', 'Calube, Sibutad', 'Delapa, Sibutad', 'Kanim, Sibutad', 'Libay, Sibutad', 'Magsaysay, Sibutad', 'Marapong, Sibutad', 'Minlasag, Sibutad', 'Oyan, Sibutad', 'Panganuran, Sibutad', 'Poblacion, Sibutad', 'Sawang, Sibutad', 'Sibuloc, Sibutad', 'Sinipay, Sibutad', 'Sipaloc, Sibutad', 'Bago, Sindangan', 'Balok, Sindangan', 'Bantayan, Sindangan', 'Bato, Sindangan', 'Benigno Aquino Jr., Sindangan', 'Binuangan, Sindangan', 'Bitoon, Sindangan', 'Bucana, Sindangan', 'Calatunan, Sindangan', 'Caluan, Sindangan', 'Calubian, Sindangan', 'Dagohoy, Sindangan', 'Dapaon, Sindangan', 'Datagan, Sindangan', 'Datu Tangkilan, Sindangan', 'Dicoyong, Sindangan', 'Disud, Sindangan', 'Don Ricardo Macias, Sindangan', 'Doña Josefa, Sindangan', 'Dumalogdog, Sindangan', 'Fatima, Sindangan', 'Gampis, Sindangan', 'Goleo, Sindangan', 'Imelda, Sindangan', 'Inuman, Sindangan', 'Joaquin Macias, Sindangan', 'La Concepcion, Sindangan', 'La Roche San Miguel, Sindangan', 'Labakid, Sindangan', 'Lagag, Sindangan', 'Lapero, Sindangan', 'Lawis, Sindangan', 'Magsaysay, Sindangan', 'Mandih, Sindangan', 'Maras, Sindangan', 'Mawal, Sindangan', 'Misok, Sindangan', 'Motibot, Sindangan', 'Nato, Sindangan', 'Nipaan, Sindangan', 'Pangalalan, Sindangan', 'Piao, Sindangan', 'Poblacion, Sindangan', 'Santo Niño, Sindangan', 'Santo Rosario, Sindangan', 'Siare, Sindangan', 'Talinga, Sindangan', 'Tigbao, Sindangan', 'Tinaplan, Sindangan', 'Titik, Sindangan', 'Upper Inuman, Sindangan', 'Upper Nipaan, Sindangan', 'Andres Micubo Jr., Siocon', 'Balagunan, Siocon', 'Bucana, Siocon', 'Bulacan, Siocon', 'Candiz, Siocon', 'Datu Sailila, Siocon', 'Dionisio Riconalla, Siocon', 'Jose P. Brillantes, Sr., Siocon', 'Latabon, Siocon', 'Makiang, Siocon', 'Malambuhangin, Siocon', 'Malipot, Siocon', 'Manaol, Siocon', 'Mateo Francisco, Siocon', 'Matiag, Siocon', 'New Lituban, Siocon', 'Pangian, Siocon', 'Pisawak, Siocon', 'Poblacion, Siocon', 'S. Cabral, Siocon', 'Santa Maria, Siocon', 'Siay, Siocon', 'Suhaile Arabi, Siocon', 'Tabayo, Siocon', 'Tagaytay, Siocon', 'Tibangao, Siocon', 'Balatakan, Sirawai', 'Balonkan, Sirawai', 'Balubuan, Sirawai', 'Bitugan, Sirawai', 'Bongon, Sirawai', 'Catuyan, Sirawai', 'Culasian, Sirawai', 'Danganon, Sirawai', 'Doña Cecilia, Sirawai', 'Guban, Sirawai', 'Lagundi, Sirawai', 'Libucon, Sirawai', 'Lubok, Sirawai', 'Macuyon, Sirawai', 'Minanga, Sirawai', 'Motong, Sirawai', 'Napulan, Sirawai', 'Panabutan, Sirawai', 'Piacan, Sirawai', 'Pisa Itom, Sirawai', 'Pisa Puti, Sirawai', 'Piña, Sirawai', 'Pugos, Sirawai', 'Pula Bato, Sirawai', 'Pulang Lupa, Sirawai', 'Saint Mary, Sirawai', 'San Nicolas, Sirawai', 'San Roque, Sirawai', 'San Vicente, Sirawai', 'Sipakit, Sirawai', 'Sipawa, Sirawai', 'Sirawai Proper, Sirawai', 'Talabiga, Sirawai', 'Tapanayan, Sirawai', 'Balacbaan, Tampilisan', 'Banbanan, Tampilisan', 'Barili, Tampilisan', 'Cabong, Tampilisan', 'Camul, Tampilisan', 'Farmington, Tampilisan', 'Galingon, Tampilisan', 'Lawaan, Tampilisan', 'Lumbayao, Tampilisan', 'Malila-t, Tampilisan', 'Molos, Tampilisan', 'New Dapitan, Tampilisan', 'Poblacion, Tampilisan', 'Sandayong, Tampilisan', 'Santo Niño, Tampilisan', 'Situbo, Tampilisan', 'Tilubog, Tampilisan', 'Tininggaan, Tampilisan', 'Tubod, Tampilisan', 'Znac, Tampilisan'
        ],
        'zamboanga del sur': [
            'SiquijorAcad, Aurora', 'Alang-alang, Aurora', 'Alegria, Aurora', 'Anonang, Aurora', 'Bagong Mandaue, Aurora', 'Bagong Maslog, Aurora', 'Bagong Oslob, Aurora', 'Bagong Pitogo, Aurora', 'Baki, Aurora', 'Balas, Aurora', 'Balide, Aurora', 'Balintawak, Aurora', 'Bayabas, Aurora', 'Bemposa, Aurora', 'Cabilinan, Aurora', 'Campo Uno, Aurora', 'Ceboneg, Aurora', 'Commonwealth, Aurora', 'Gubaan, Aurora', 'Inasagan, Aurora', 'Inroad, Aurora', 'Kahayagan East, Aurora', 'Kahayagan West, Aurora', 'Kauswagan, Aurora', 'La Paz, Aurora', 'La Victoria, Aurora', 'Lantungan, Aurora', 'Libertad, Aurora', 'Lintugop, Aurora', 'Lubid, Aurora', 'Maguikay, Aurora', 'Mahayahay, Aurora', 'Monte Alegre, Aurora', 'Montela, Aurora', 'Napo, Aurora', 'Panaghiusa, Aurora', 'Poblacion, Aurora', 'Resthouse, Aurora', 'Romarate, Aurora', 'San Jose, Aurora', 'San Juan, Aurora', 'Sapa Loboc, Aurora', 'Tagulalo, Aurora', 'Waterfall, Aurora', 'Baking, Bayog', 'Balukbahan, Bayog', 'Balumbunan, Bayog', 'Bantal, Bayog', 'Bobuan, Bayog', 'Camp Blessing, Bayog', 'Canoayan, Bayog', 'Conacon, Bayog', 'Dagum, Bayog', 'Damit, Bayog', 'Datagan, Bayog', 'Depase, Bayog', 'Depili, Bayog', 'Depore, Bayog', 'Deporehan, Bayog', 'Dimalinao, Bayog', 'Kahayagan, Bayog', 'Kanipaan, Bayog', 'Lamare, Bayog', 'Liba, Bayog', 'Matin-ao, Bayog', 'Matun-og, Bayog', 'Pangi, Bayog', 'Poblacion, Bayog', 'Pulang Bato, Bayog', 'Salawagan, Bayog', 'Sigacad, Bayog', 'Supon, Bayog', 'Bacayawan, Dimataling', 'Baha, Dimataling', 'Balanagan, Dimataling', 'Baluno, Dimataling', 'Binuay, Dimataling', 'Buburay, Dimataling', 'Grap, Dimataling', 'Josefina, Dimataling', 'Kagawasan, Dimataling', 'Lalab, Dimataling', 'Libertad, Dimataling', 'Magahis, Dimataling', 'Mahayag, Dimataling', 'Mercedes, Dimataling', 'Poblacion, Dimataling', 'Saloagan, Dimataling', 'San Roque, Dimataling', 'Sugbay Uno, Dimataling', 'Sumbato, Dimataling', 'Sumpot, Dimataling', 'Tinggabulong, Dimataling', 'Tiniguangan, Dimataling', 'Tipangi, Dimataling', 'Upper Ludiong, Dimataling', 'Bacawan, Dinas', 'Benuatan, Dinas', 'Beray, Dinas', 'Don Jose, Dinas', 'Dongos, Dinas', 'East Migpulao, Dinas', 'Guinicolalay, Dinas', 'Ignacio Garrata, Dinas', 'Kinacap, Dinas', 'Legarda 1, Dinas', 'Legarda 2, Dinas', 'Legarda 3, Dinas', 'Lower Dimaya, Dinas', 'Lucoban, Dinas', 'Ludiong, Dinas', 'Nangka, Dinas', 'Nian, Dinas', 'Old Mirapao, Dinas', 'Pisa-an, Dinas', 'Poblacion, Dinas', 'Proper Dimaya, Dinas', 'Sagacad, Dinas', 'Sambulawan, Dinas', 'San Isidro, Dinas', 'Songayan, Dinas', 'Sumpotan, Dinas', 'Tarakan, Dinas', 'Upper Dimaya, Dinas', 'Upper Sibul, Dinas', 'West Migpulao, Dinas', 'Anonang, Dumalinao', 'Bag-ong Misamis, Dumalinao', 'Bag-ong Silao, Dumalinao', 'Baga, Dumalinao', 'Baloboan, Dumalinao', 'Banta-ao, Dumalinao', 'Bibilik, Dumalinao', 'Calingayan, Dumalinao', 'Camalig, Dumalinao', 'Camanga, Dumalinao', 'Cuatro-cuatro, Dumalinao', 'Locuban, Dumalinao', 'Malasik, Dumalinao', 'Mama, Dumalinao', 'Matab-ang, Dumalinao', 'Mecolong, Dumalinao', 'Metokong, Dumalinao', 'Motosawa, Dumalinao', 'Pag-asa, Dumalinao', 'Paglaum, Dumalinao', 'Pantad, Dumalinao', 'Piniglibano, Dumalinao', 'Rebokon, Dumalinao', 'San Agustin, Dumalinao', 'Sibucao, Dumalinao', 'Sumadat, Dumalinao', 'Tikwas, Dumalinao', 'Tina, Dumalinao', 'Tubo-Pait, Dumalinao', 'Upper Dumalinao, Dumalinao', 'Bag-ong Valencia, Dumingag', 'Bagong Kauswagan, Dumingag', 'Bagong Silang, Dumingag', 'Bucayan, Dumingag', 'Calumanggi, Dumingag', 'Canibongan, Dumingag', 'Caridad, Dumingag', 'Danlugan, Dumingag', 'Dapiwak, Dumingag', 'Datu Totocan, Dumingag', 'Dilud, Dumingag', 'Ditulan, Dumingag', 'Dulian, Dumingag', 'Dulop, Dumingag', 'Guintananan, Dumingag', 'Guitran, Dumingag', 'Gumpingan, Dumingag', 'La Fortuna, Dumingag', 'Labangon, Dumingag', 'Libertad, Dumingag', 'Licabang, Dumingag', 'Lipawan, Dumingag', 'Lower Landing, Dumingag', 'Lower Timonan, Dumingag', 'Macasing, Dumingag', 'Mahayahay, Dumingag', 'Malagalad, Dumingag', 'Manlabay, Dumingag', 'Maralag, Dumingag', 'Marangan, Dumingag', 'New Basak, Dumingag', 'Saad, Dumingag', 'Salvador, Dumingag', 'San Juan, Dumingag', 'San Pablo, Dumingag', 'San Pedro, Dumingag', 'San Vicente, Dumingag', 'Senote, Dumingag', 'Sinonok, Dumingag', 'Sunop, Dumingag', 'Tagun, Dumingag', 'Tamurayan, Dumingag', 'Upper Landing, Dumingag', 'Upper Timonan, Dumingag', 'Bagong Oroquieta, Guipos', 'Baguitan, Guipos', 'Balongating, Guipos', 'Canunan, Guipos', 'Dacsol, Guipos', 'Dagohoy, Guipos', 'Dalapang, Guipos', 'Datagan, Guipos', 'Guling, Guipos', 'Katipunan, Guipos', 'Lintum, Guipos', 'Litan, Guipos', 'Magting, Guipos', 'Poblacion, Guipos', 'Regla, Guipos', 'Sikatuna, Guipos', 'Singclot, Guipos', 'Bogo Calabat, Josefina', 'Dawa, Josefina', 'Ebarle, Josefina', 'Gumahan, Josefina', 'Leonardo, Josefina', 'Litapan, Josefina', 'Lower Bagong Tudela, Josefina', 'Mansanas, Josefina', 'Moradji, Josefina', 'Nemeño, Josefina', 'Nopulan, Josefina', 'Sebukang, Josefina', 'Tagaytay Hill, Josefina', 'Upper Bagong Tudela, Josefina', 'Bogayo, Kumalarang', 'Bolisong, Kumalarang', 'Boyugan East, Kumalarang', 'Boyugan West, Kumalarang', 'Bualan, Kumalarang', 'Diplo, Kumalarang', 'Gawil, Kumalarang', 'Gusom, Kumalarang', 'Kitaan Dagat, Kumalarang', 'Lantawan, Kumalarang', 'Limamawan, Kumalarang', 'Mahayahay, Kumalarang', 'Pangi, Kumalarang', 'Picanan, Kumalarang', 'Poblacion, Kumalarang', 'Salagmanok, Kumalarang', 'Secade, Kumalarang', 'Suminalum, Kumalarang', 'Bagalupa, Labangan', 'Balimbingan, Labangan', 'Binayan, Labangan', 'Bokong, Labangan', 'Bulanit, Labangan', 'Cogonan, Labangan', 'Combo, Labangan', 'Dalapang, Labangan', 'Dimasangca, Labangan', 'Dipaya, Labangan', 'Langapod, Labangan', 'Lantian, Labangan', 'Lower Campo Islam, Labangan', 'Lower Pulacan, Labangan', 'Lower Sang-an, Labangan', 'New Labangan, Labangan', 'Noboran, Labangan', 'Old Labangan, Labangan', 'San Isidro, Labangan', 'Santa Cruz, Labangan', 'Tapodoc, Labangan', 'Tawagan Norte, Labangan', 'Upper Campo Islam, Labangan', 'Upper Pulacan, Labangan', 'Upper Sang-an, Labangan', 'Bagong Kahayag, Lakewood', 'Baking, Lakewood', 'Biswangan, Lakewood', 'Bululawan, Lakewood', 'Dagum, Lakewood', 'Gasa, Lakewood', 'Gatub, Lakewood', 'Lukuan, Lakewood', 'Matalang, Lakewood', 'Poblacion, Lakewood', 'Sapang Pinoles, Lakewood', 'Sebuguey, Lakewood', 'Tiwales, Lakewood', 'Tubod, Lakewood', 'Bulawan, Lapuyan', 'Carpoc, Lapuyan', 'Danganan, Lapuyan', 'Dansal, Lapuyan', 'Dumara, Lapuyan', 'Linokmadalum, Lapuyan', 'Luanan, Lapuyan', 'Lubusan, Lapuyan', 'Lubusan, Lapuyan', 'Mandeg, Lapuyan', 'Maralag, Lapuyan', 'Maruing, Lapuyan', 'Molum, Lapuyan', 'Pampang, Lapuyan', 'Pantad, Lapuyan', 'Pingalay, Lapuyan', 'Poblacion, Lapuyan', 'Salambuyan, Lapuyan', 'San Jose, Lapuyan', 'Sayog, Lapuyan', 'Tabon, Lapuyan', 'Talabab, Lapuyan', 'Tiguha, Lapuyan', 'Tininghalang, Lapuyan', 'Tipasan, Lapuyan', 'Tugaya, Lapuyan', 'Bag-ong Balamban, Mahayag', 'Bag-ong Dalaguete, Mahayag', 'Boniao, Mahayag', 'Delusom, Mahayag', 'Diwan, Mahayag', 'Guripan, Mahayag', 'Kaangayan, Mahayag', 'Kabuhi, Mahayag', 'Lourmah, Mahayag', 'Lower Salug Daku, Mahayag', 'Lower Santo Niño, Mahayag', 'Malubo, Mahayag', 'Manguiles, Mahayag', 'Marabanan, Mahayag', 'Panagaan, Mahayag', 'Paraiso, Mahayag', 'Pedagan, Mahayag', 'Poblacion, Mahayag', 'Pugwan, Mahayag', 'San Isidro, Mahayag', 'San Jose, Mahayag', 'San Vicente, Mahayag', 'Santa Cruz, Mahayag', 'Sicpao, Mahayag', 'Tuboran, Mahayag', 'Tulan, Mahayag', 'Tumapic, Mahayag', 'Upper Salug Daku, Mahayag', 'Upper Santo Niño, Mahayag', 'Balintawak, Margosatubig', 'Bularong, Margosatubig', 'Digon, Margosatubig', 'Guinimanan, Margosatubig', 'Igat Island, Margosatubig', 'Josefina, Margosatubig', 'Kalian, Margosatubig', 'Kolot, Margosatubig', 'Limamawan, Margosatubig', 'Limbatong, Margosatubig', 'Lumbog, Margosatubig', 'Magahis, Margosatubig', 'Poblacion, Margosatubig', 'Sagua, Margosatubig', 'Talanusa, Margosatubig', 'Tiguian, Margosatubig', 'Tulapok, Margosatubig', 'Bacahan, Midsalip', 'Balabawan, Midsalip', 'Bibilop, Midsalip', 'Buloron, Midsalip', 'Cabaloran, Midsalip', 'Canipay Norte, Midsalip', 'Canipay Sur, Midsalip', 'Cumaron, Midsalip', 'Dakayakan, Midsalip', 'Duelic, Midsalip', 'Dumalinao, Midsalip', 'Ecuan, Midsalip', 'Golictop, Midsalip', 'Guinabot, Midsalip', 'Guitalos, Midsalip', 'Guma, Midsalip', 'Kahayagan, Midsalip', 'Licuro-an, Midsalip', 'Lumpunid, Midsalip', 'Matalang, Midsalip', 'New Katipunan, Midsalip', 'New Unidos, Midsalip', 'Palili, Midsalip', 'Pawan, Midsalip', 'Pili, Midsalip', 'Pisompongan, Midsalip', 'Piwan, Midsalip', 'Poblacion A, Midsalip', 'Poblacion B, Midsalip', 'Sigapod, Midsalip', 'Timbaboy, Midsalip', 'Tulbong, Midsalip', 'Tuluan, Midsalip', 'Alicia, Molave', 'Ariosa, Molave', 'Bagong Argao, Molave', 'Bagong Gutlang, Molave', 'Blancia, Molave', 'Bogo Capalaran, Molave', 'Culo, Molave', 'Dalaon, Molave', 'Dipolo, Molave', 'Dontulan, Molave', 'Gonosan, Molave', 'Lower Dimalinao, Molave', 'Lower Dimorok, Molave', 'Mabuhay, Molave', 'Madasigon, Molave', 'Makuguihon, Molave', 'Maloloy-on, Molave', 'Miligan, Molave', 'Parasan, Molave', 'Rizal, Molave', 'Santo Rosario, Molave', 'Silangit, Molave', 'Simata, Molave', 'Sudlon, Molave', 'Upper Dimorok, Molave', 'Alegria, Pagadian', 'Balangasan, Pagadian', 'Balintawak, Pagadian', 'Baloyboan, Pagadian', 'Banale, Pagadian', 'Bogo, Pagadian', 'Bomba, Pagadian', 'Buenavista, Pagadian', 'Bulatok, Pagadian', 'Bulawan, Pagadian', 'Dampalan, Pagadian', 'Danlugan, Pagadian', 'Dao, Pagadian', 'Datagan, Pagadian', 'Deborok, Pagadian', 'Ditoray, Pagadian', 'Dumagoc, Pagadian', 'Gatas, Pagadian', 'Gubac, Pagadian', 'Gubang, Pagadian', 'Kagawasan, Pagadian', 'Kahayagan, Pagadian', 'Kalasan, Pagadian', 'Kawit, Pagadian', 'La Suerte, Pagadian', 'Lala, Pagadian', 'Lapidian, Pagadian', 'Lenienza, Pagadian', 'Lizon Valley, Pagadian', 'Lourdes, Pagadian', 'Lower Sibatang, Pagadian', 'Lumad, Pagadian', 'Lumbia, Pagadian', 'Macasing, Pagadian', 'Manga, Pagadian', 'Muricay, Pagadian', 'Napolan, Pagadian', 'Palpalan, Pagadian', 'Pedulonan, Pagadian', 'Poloyagan, Pagadian', 'San Francisco, Pagadian', 'San Jose, Pagadian', 'San Pedro, Pagadian', 'Santa Lucia, Pagadian', 'Santa Maria, Pagadian', 'Santiago, Pagadian', 'Santo Niño, Pagadian', 'Tawagan Sur, Pagadian', 'Tiguma, Pagadian', 'Tuburan, Pagadian', 'Tulangan, Pagadian', 'Tulawas, Pagadian', 'Upper Sibatang, Pagadian', 'White Beach, Pagadian', 'Balabawan, Pitogo', 'Balong-balong, Pitogo', 'Colojo, Pitogo', 'Liasan, Pitogo', 'Liguac, Pitogo', 'Limbayan, Pitogo', 'Lower Paniki-an, Pitogo', 'Matin-ao, Pitogo', 'Panubigan, Pitogo', 'Poblacion, Pitogo', 'Punta Flecha, Pitogo', 'San Isidro, Pitogo', 'Sugbay Dos, Pitogo', 'Tongao, Pitogo', 'Upper Paniki-an, Pitogo', 'Bag-ong Opon, Ramon Magsaysay', 'Bambong Daku, Ramon Magsaysay', 'Bambong Diut, Ramon Magsaysay', 'Bobongan, Ramon Magsaysay', 'Campo IV, Ramon Magsaysay', 'Campo V, Ramon Magsaysay', 'Caniangan, Ramon Magsaysay', 'Dipalusan, Ramon Magsaysay', 'Eastern Bobongan, Ramon Magsaysay', 'Esperanza, Ramon Magsaysay', 'Gapasan, Ramon Magsaysay', 'Katipunan, Ramon Magsaysay', 'Kauswagan, Ramon Magsaysay', 'Lower Sambulawan, Ramon Magsaysay', 'Mabini, Ramon Magsaysay', 'Magsaysay, Ramon Magsaysay', 'Malating, Ramon Magsaysay', 'Paradise, Ramon Magsaysay', 'Pasingkalan, Ramon Magsaysay', 'Poblacion, Ramon Magsaysay', 'San Fernando, Ramon Magsaysay', 'Santo Rosario, Ramon Magsaysay', 'Sapa Anding, Ramon Magsaysay', 'Sinaguing, Ramon Magsaysay', 'Switch, Ramon Magsaysay', 'Upper Laperian, Ramon Magsaysay', 'Wakat, Ramon Magsaysay', 'Betinan, San Miguel', 'Bulawan, San Miguel', 'Calube, San Miguel', 'Concepcion, San Miguel', 'Dao-an, San Miguel', 'Dumalian, San Miguel', 'Fatima, San Miguel', 'Langilan, San Miguel', 'Lantawan, San Miguel', 'Laperian, San Miguel', 'Libuganan, San Miguel', 'Limonan, San Miguel', 'Mati, San Miguel', 'Ocapan, San Miguel', 'Poblacion, San Miguel', 'San Isidro, San Miguel', 'Sayog, San Miguel', 'Tapian, San Miguel', 'Bag-ong Misamis, San Pablo', 'Bubual, San Pablo', 'Buton, San Pablo', 'Culasian, San Pablo', 'Daplayan, San Pablo', 'Kalilangan, San Pablo', 'Kondum, San Pablo', 'Lumbayao, San Pablo', 'Mabuhay, San Pablo', 'Marcos Village, San Pablo', 'Miasin, San Pablo', 'Molansong, San Pablo', 'Pantad, San Pablo', 'Pao, San Pablo', 'Payag, San Pablo', 'Poblacion, San Pablo', 'Pongapong, San Pablo', 'Sacbulan, San Pablo', 'Sagasan, San Pablo', 'San Juan, San Pablo', 'Senior, San Pablo', 'Songgoy, San Pablo', 'Tandubuay, San Pablo', 'Taniapan, San Pablo', 'Ticala Island, San Pablo', 'Tubo-pait, San Pablo', 'Villakapa, San Pablo', 'Bag-ong Baroy, Sominot', 'Bag-ong Oroquieta, Sominot', 'Barubuhan, Sominot', 'Bulanay, Sominot', 'Datagan, Sominot', 'Eastern Poblacion, Sominot', 'Lantawan, Sominot', 'Libertad, Sominot', 'Lumangoy, Sominot', 'New Carmen, Sominot', 'Picturan, Sominot', 'Poblacion, Sominot', 'Rizal, Sominot', 'San Miguel, Sominot', 'Santo Niño, Sominot', 'Sawa, Sominot', 'Tungawan, Sominot', 'Upper Sicpao, Sominot', 'Abong-abong, Tabina', 'Baganian, Tabina', 'Baya-baya, Tabina', 'Capisan, Tabina', 'Concepcion, Tabina', 'Culabay, Tabina', 'Doña Josefina, Tabina', 'Lumbia, Tabina', 'Mabuhay, Tabina', 'Malim, Tabina', 'Manikaan, Tabina', 'New Oroquieta, Tabina', 'Poblacion, Tabina', 'San Francisco, Tabina', 'Tultolan, Tabina', 'Alang-alang, Tambulig', 'Angeles, Tambulig', 'Bag-ong Kauswagan, Tambulig', 'Bag-ong Tabogon, Tambulig', 'Balugo, Tambulig', 'Cabgan, Tambulig', 'Calolot, Tambulig', 'Dimalinao, Tambulig', 'Fabian, Tambulig', 'Gabunon, Tambulig', 'Happy Valley, Tambulig', 'Kapalaran, Tambulig', 'Limamawan, Tambulig', 'Lower Liasan, Tambulig', 'Lower Lodiong, Tambulig', 'Lower Tiparak, Tambulig', 'Lower Usogan, Tambulig', 'Maya-maya, Tambulig', 'New Village, Tambulig', 'Pelocoban, Tambulig', 'Riverside, Tambulig', 'Sagrada Familia, Tambulig', 'San Jose, Tambulig', 'San Vicente, Tambulig', 'Sumalig, Tambulig', 'Tuluan, Tambulig', 'Tungawan, Tambulig', 'Upper Liason, Tambulig', 'Upper Lodiong, Tambulig', 'Upper Tiparak, Tambulig', 'Begong, Tigbao', 'Busol, Tigbao', 'Caluma, Tigbao', 'Diana Countryside, Tigbao', 'Guinlin, Tigbao', 'Lacarayan, Tigbao', 'Lacupayan, Tigbao', 'Limas, Tigbao', 'Longmot, Tigbao', 'Maragang, Tigbao', 'Mate, Tigbao', 'Nangan-nangan, Tigbao', 'New Tuburan, Tigbao', 'Nilo, Tigbao', 'Tigbao, Tigbao', 'Timolan, Tigbao', 'Upper Nilo, Tigbao', 'Alindahaw, Tukuran', 'Baclay, Tukuran', 'Balimbingan, Tukuran', 'Buenasuerte, Tukuran', 'Camanga, Tukuran', 'Curvada, Tukuran', 'Laperian, Tukuran', 'Libertad, Tukuran', 'Lower Bayao, Tukuran', 'Luy-a, Tukuran', 'Manilan, Tukuran', 'Manlayag, Tukuran', 'Militar, Tukuran', 'Navalan, Tukuran', 'Panduma Senior, Tukuran', 'Sambulawan, Tukuran', 'San Antonio, Tukuran', 'San Carlos, Tukuran', 'Santo Niño, Tukuran', 'Santo Rosario, Tukuran', 'Sugod, Tukuran', 'Tabuan, Tukuran', 'Tagulo, Tukuran', 'Tinotungan, Tukuran', 'Upper Bayao, Tukuran', 'Ambulon, Vincenzo A. Sagun', 'Bui-os, Vincenzo A. Sagun', 'Cogon, Vincenzo A. Sagun', 'Danan, Vincenzo A. Sagun', 'Kabatan, Vincenzo A. Sagun', 'Kapatagan, Vincenzo A. Sagun', 'Limason, Vincenzo A. Sagun', 'Linoguayan, Vincenzo A. Sagun', 'Lumbal, Vincenzo A. Sagun', 'Lunib, Vincenzo A. Sagun', 'Maculay, Vincenzo A. Sagun', 'Maraya, Vincenzo A. Sagun', 'Sagucan, Vincenzo A. Sagun', 'Waling-waling, Vincenzo A. Sagun'
        ]
    };

    function getBarangayValue() {
        if (barangaySelect.style.display !== 'none') {
            return barangaySelect.value.trim();
        }
        return barangayInput.value.trim();
    }

    function populateBarangayOptions(city) {
        const normalizedCity = city.trim().toLowerCase();
        const barangays = barangaysByCity[normalizedCity];

        if (barangays) {
            barangaySelect.innerHTML = '<option value="">Select Barangay</option>' + barangays.map(barangay => `<option value="${barangay}">${barangay}</option>`).join('');
            barangaySelect.style.display = '';
            barangaySelect.required = true;
            barangayInput.style.display = 'none';
            barangayInput.required = false;
            barangayInput.value = '';
        } else {
            barangaySelect.style.display = 'none';
            barangaySelect.required = false;
            barangaySelect.value = '';
            barangayInput.style.display = '';
            barangayInput.required = true;
        }
    }

    // Form validation
    function validateForm() {
        const requiredFields = ['houseNumber', 'cityMunicipality', 'zipCode', 'country'];
        let isValid = true;

        requiredFields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (!field.value.trim()) {
                alert(`Please fill in the ${field.previousElementSibling.textContent.replace(' *', '')} field.`);
                isValid = false;
                return false;
            }
        });

        const barangayValue = getBarangayValue();
        if (!barangayValue) {
            alert('Please select or enter a Barangay.');
            return false;
        }

        // Zip code validation (4 digits for Philippines)
        const zipCode = document.getElementById('zipCode').value.trim();
        if (zipCode && !/^[0-9]{4}$/.test(zipCode)) {
            alert('Please enter a valid 4-digit zip code.');
            return false;
        }

        return isValid;
    }

    // Handle confirm button click
    if (confirmButton) {
        confirmButton.addEventListener('click', function(e) {
            e.preventDefault();

            // Validate form
            if (!validateForm()) {
                return;
            }

            // Collect form data
            collectLocationData();

            // Show booking confirmation modal
            showBookingModal();
        });
    }

    // Modal event listeners
    if (bookingModalClose) {
        bookingModalClose.addEventListener('click', hideBookingModal);
    }

    if (bookingModal) {
        bookingModal.addEventListener('click', function(e) {
            if (e.target === bookingModal) {
                hideBookingModal();
            }
        });
    }

    if (editBookingBtn) {
        editBookingBtn.addEventListener('click', hideBookingModal);
    }

    if (finalizeBookingBtn) {
        finalizeBookingBtn.addEventListener('click', finalizeBooking);
    }

    // Load existing location info if available
    const savedLocationInfo = localStorage.getItem('locationInfo');
    if (savedLocationInfo) {
        const locationData = JSON.parse(savedLocationInfo);
        document.getElementById('houseNumber').value = locationData.houseNumber || '';
        document.getElementById('blockNumber').value = locationData.blockNumber || '';
        document.getElementById('lotNumber').value = locationData.lotNumber || '';
        document.getElementById('cityMunicipality').value = locationData.cityMunicipality || '';
        populateBarangayOptions(locationData.cityMunicipality || '');

        if (barangaySelect.style.display !== 'none') {
            barangaySelect.value = locationData.barangay || '';
        } else {
            barangayInput.value = locationData.barangay || '';
        }

        document.getElementById('zipCode').value = locationData.zipCode || '';
        document.getElementById('country').value = locationData.country || 'Philippines';
    }

    cityMunicipality.addEventListener('change', function() {
        populateBarangayOptions(cityMunicipality.value);
    });

    cityMunicipality.addEventListener('blur', function() {
        populateBarangayOptions(cityMunicipality.value);
    });
});

// Collect location data from the form
function collectLocationData() {
    const barangayInput = document.getElementById('barangayInput');
    const barangaySelect = document.getElementById('barangaySelect');
    let barangayValue = '';

    if (barangaySelect && barangaySelect.style.display !== 'none') {
        barangayValue = barangaySelect.value.trim();
    } else if (barangayInput) {
        barangayValue = barangayInput.value.trim();
    }

    const locationData = {
        houseNumber: document.getElementById('houseNumber').value.trim(),
        blockNumber: document.getElementById('blockNumber').value.trim(),
        lotNumber: document.getElementById('lotNumber').value.trim(),
        barangay: barangayValue,
        cityMunicipality: document.getElementById('cityMunicipality').value.trim(),
        zipCode: document.getElementById('zipCode').value.trim(),
        country: document.getElementById('country').value
    };

    // Store in localStorage for the booking flow
    localStorage.setItem('locationInfo', JSON.stringify(locationData));
}

// Show booking confirmation modal
function showBookingModal() {
    const bookingModal = document.getElementById('bookingModal');
    if (!bookingModal) return;

    // Collect all booking data
    const serviceData = JSON.parse(localStorage.getItem('serviceData') || '{}');
    const contactData = JSON.parse(localStorage.getItem('contactInfo') || '{}');
    const locationData = JSON.parse(localStorage.getItem('locationInfo') || '{}');
    const scheduleData = JSON.parse(localStorage.getItem('scheduleData') || '{}');

    // Generate booking details HTML
    const detailsHTML = generateBookingDetailsHTML(serviceData, contactData, locationData, scheduleData);

    // Populate modal
    document.getElementById('bookingDetails').innerHTML = detailsHTML;

    // Show modal
    bookingModal.classList.add('open');
}

// Hide booking confirmation modal
function hideBookingModal() {
    const bookingModal = document.getElementById('bookingModal');
    if (!bookingModal) return;
    bookingModal.classList.remove('open');
}

// Finalize booking
function finalizeBooking() {
    // Here you would typically send the booking data to a server
    // For now, we'll just show a success message and redirect

    alert('🎉 Booking confirmed! Thank you for choosing Home Care Service. You will receive a confirmation email shortly.');

    // Clear booking data from localStorage
    localStorage.removeItem('serviceData');
    localStorage.removeItem('contactInfo');
    localStorage.removeItem('locationInfo');

    // Redirect to home page or dashboard
    window.location.href = '../../home.html';
}

// Generate HTML for booking details
function generateBookingDetailsHTML(service, contact, location, schedule) {
    let html = '';

    // Service Details
    if (service && Object.keys(service).length > 0) {
        html += `
            <div class="detail-section">
                <h3>🛠️ Service Information</h3>
                <p><strong>Service Type:</strong> ${service.serviceName || 'Not selected'}</p>
                <p><strong>Description:</strong> ${service.description || 'Not available'}</p>
                <p><strong>Base Pricing:</strong> ${service.pricing || 'Contact for pricing'}</p>
            </div>
        `;
    }

    // Schedule Details
    if (schedule && Object.keys(schedule).length > 0) {
        html += `
            <div class="detail-section">
                <h3>📅 Schedule Details</h3>
                <p><strong>Schedule Type:</strong> ${formatScheduleType(schedule.scheduleType)}</p>
                <p><strong>Starting Date:</strong> ${formatDate(schedule.details?.startDate)}</p>
                ${generateScheduleSpecificDetails(schedule)}
            </div>
        `;
    }

    // Contact Details
    if (contact && Object.keys(contact).length > 0) {
        html += `
            <div class="detail-section">
                <h3>📞 Contact Information</h3>
                <p><strong>Email:</strong> ${contact.email || 'Not provided'}</p>
                <p><strong>Mobile Phone:</strong> ${contact.contactNumber || 'Not provided'}</p>
                ${contact.telephoneNumber ? `<p><strong>Telephone:</strong> ${contact.telephoneNumber}</p>` : ''}
            </div>
        `;
    }

    // Location Details
    if (location && Object.keys(location).length > 0) {
        html += `
            <div class="detail-section">
                <h3>📍 Service Location</h3>
                <p><strong>Address:</strong> ${location.houseNumber || ''} ${location.barangay || ''}, ${location.cityMunicipality || ''}</p>
                ${location.blockNumber ? `<p><strong>Block:</strong> ${location.blockNumber}</p>` : ''}
                ${location.lotNumber ? `<p><strong>Lot:</strong> ${location.lotNumber}</p>` : ''}
                <p><strong>Zip Code:</strong> ${location.zipCode || 'Not provided'}</p>
                <p><strong>Country:</strong> ${location.country || 'Not provided'}</p>
            </div>
        `;
    }

    // Payment Summary
    const paymentSummary = calculatePaymentSummary(service, schedule);
    html += `
        <div class="detail-section payment-summary">
            <h3>💰 Payment Summary</h3>
            <div class="payment-breakdown">
                <p><strong>Service Base Rate:</strong> ${paymentSummary.baseRate}</p>
                ${paymentSummary.scheduleMultiplier > 1 ? `<p><strong>Schedule Multiplier:</strong> ${paymentSummary.scheduleMultiplier}x</p>` : ''}
                <p><strong>Estimated Hours:</strong> ${paymentSummary.estimatedHours} hour(s)</p>
                <div class="total-amount">
                    <p><strong>Total Estimated Cost:</strong> ${paymentSummary.totalCost}</p>
                </div>
                <p class="payment-note"><em>* Final pricing may vary based on actual service duration and requirements</em></p>
            </div>
        </div>
    `;

    return html;
}

// Helper function to format schedule type
function formatScheduleType(scheduleType) {
    const typeMap = {
        'hourly': 'Hourly Service',
        'daily': 'Daily Service',
        'biweekly': 'Bi-weekly Service',
        'monthly': 'Monthly Service'
    };
    return typeMap[scheduleType] || scheduleType;
}

// Helper function to format date
function formatDate(dateString) {
    if (!dateString) return 'Not specified';
    try {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    } catch (e) {
        return dateString;
    }
}

// Helper function to generate schedule-specific details
function generateScheduleSpecificDetails(schedule) {
    if (!schedule || !schedule.details) return '';

    let details = '';

    switch (schedule.scheduleType) {
        case 'hourly':
            if (schedule.details.hourlyHours) {
                details += `<p><strong>Duration:</strong> ${schedule.details.hourlyHours} hours</p>`;
            }
            break;

        case 'daily':
            if (schedule.details.dailyHours) {
                details += `<p><strong>Hours per day:</strong> ${schedule.details.dailyHours} hours</p>`;
            }
            break;

        case 'biweekly':
            if (schedule.details.biweeklyDays && schedule.details.biweeklyDays.length > 0) {
                details += `<p><strong>Days:</strong> ${schedule.details.biweeklyDays.join(', ')}</p>`;
            }
            if (schedule.details.biweeklyHours) {
                details += `<p><strong>Hours per day:</strong> ${schedule.details.biweeklyHours} hours</p>`;
            }
            break;

        case 'monthly':
            if (schedule.details.monthlyFrequency) {
                const freqMap = {
                    'once': 'Once per month',
                    'twice': 'Twice per month'
                };
                details += `<p><strong>Frequency:</strong> ${freqMap[schedule.details.monthlyFrequency] || schedule.details.monthlyFrequency}</p>`;
            }
            if (schedule.details.monthlyHours) {
                details += `<p><strong>Hours per visit:</strong> ${schedule.details.monthlyHours} hours</p>`;
            }
            break;
    }

    return details;
}

// Helper function to calculate payment summary
function calculatePaymentSummary(service, schedule) {
    // Default pricing structure (can be customized based on service data)
    const basePricing = {
        'House Cleaning': 500,
        'Laundry Service': 300,
        'Cooking Assistance': 400,
        'Elderly Care': 600,
        'Child Care': 450,
        'Pet Care': 350,
        'Gardening': 550,
        'Maintenance': 700
    };

    // Get base rate from service or use default
    let baseRate = 0;
    if (service && service.serviceName) {
        baseRate = basePricing[service.serviceName] || 500; // Default to 500 if not found
    }

    // Calculate schedule multiplier and hours
    let scheduleMultiplier = 1;
    let estimatedHours = 1;

    if (schedule && schedule.details) {
        switch (schedule.scheduleType) {
            case 'hourly':
                estimatedHours = parseFloat(schedule.details.hourlyHours) || 1;
                break;
            case 'daily':
                estimatedHours = parseFloat(schedule.details.dailyHours) || 4;
                break;
            case 'biweekly':
                // Bi-weekly service - assume 2 visits per week
                scheduleMultiplier = 0.9; // 10% discount for bi-weekly
                estimatedHours = parseFloat(schedule.details.biweeklyHours) || 3;
                break;
            case 'monthly':
                // Monthly service - assume 4 visits per month
                scheduleMultiplier = 0.85; // 15% discount for monthly
                estimatedHours = parseFloat(schedule.details.monthlyHours) || 6;
                if (schedule.details.monthlyFrequency === 'twice') {
                    estimatedHours *= 2; // Double for twice per month
                }
                break;
        }
    }

    const totalCost = Math.round(baseRate * scheduleMultiplier * estimatedHours);

    return {
        baseRate: `₱${baseRate}`,
        scheduleMultiplier: scheduleMultiplier,
        estimatedHours: estimatedHours,
        totalCost: `₱${totalCost}`
    };
}