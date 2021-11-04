const ethnicities = [
  "Aboriginal",
  "Acehnese",
  "Acholi",
  "Adja",
  "Adja-Ewe",
  "Adja-Mina",
  "Afar",
  "Affar",
  "African",
  "African American",
  "Aimaq",
  "Akan",
  "Akebu",
  "Akha",
  "Akkposso",
  "Alaska Native",
  "Alawite",
  "Albanian",
  "Algerian",
  "Amak Negeri",
  "Amara",
  "American",
  "Amerindian",
  "Amerindian Ancestory",
  "Amerinindian",
  "Amhara",
  "Amis",
  "Andorran",
  "An-lfe",
  "Anuak",
  "Any other Asian background",
  "Any other Black",
  "Any other Mixed",
  "Any other White background",
  "Arab",
  "Argentinian",
  "Armenian",
  "Aruban",
  "Assyrian ",
  "Atayal",
  "Austonesian",
  "Australian",
  "Austrian",
  "Azande",
  "Azerbajani",
  "Azeri",
  "Bada",
  "Baganda",
  "Bagisu",
  "Bahraini",
  "Bai",
  "Baikeno",
  "Baka",
  "Bakasi",
  "Bakiga",
  "Bakongo",
  "Balck African",
  "Balinese",
  "Baloch ",
  "Balochi",
  "Bambara",
  "Bangladeshi",
  "Banjarese",
  "Bantanese",
  "Bantu",
  "Banyankoie",
  "Bari",
  "Bariba",
  "Basarwa",
  "Bashkir",
  "Basoga",
  "Basque Minorities",
  "Basques",
  "Batak",
  "Baya ",
  "Bedouin",
  "Beja",
  "Belarusian",
  "Belgian",
  "Bemba",
  "Bengali",
  "Berber",
  "Berbers",
  "Betawi",
  "Bicol",
  "Bikol",
  "Binisaya",
  "Bisa",
  "Bisaya",
  "Bissa",
  "Black",
  "Black African",
  "Black American ",
  "Black British",
  "Bobo",
  "Bongo",
  "Bosnia and Herzegovinian",
  "Bosniak",
  "Brahui",
  "Bretons",
  "British",
  "Buginese",
  "Bulgarian",
  "Bumiputera",
  "Bunak ",
  "Bunun",
  "Burman",
  "Burmese",
  "Buyei",
  "Bviri",
  "Cameroon Highlanders",
  "Canadian",
  "Caribbean",
  "Caribbean Background",
  "Caribbean British",
  "Cebuano",
  "Celtic",
  "Central American ",
  "Central Asian",
  "Cham",
  "Chamar",
  "Chamorro",
  "Chechen",
  "Chhettri",
  "Chilean",
  "Chinese",
  "Chola",
  "Chola Chola",
  "Chuvash",
  "Circassian",
  "Colombian",
  "Comorian",
  "Cook Island Maori",
  "Creole",
  "Crimean Tatar",
  "Croat",
  "Cuban",
  "Curacacaon",
  "Czech",
  "Dagara",
  "Dai",
  "Damai",
  "Dangme",
  "Danish",
  "Dayak",
  "Dendi",
  "Dholii",
  "Didinga",
  "Dijboutian",
  "Dinak (jieng)",
  "Dioula",
  "Dominican",
  "Dominican Republic",
  "Dong",
  "Druze",
  "Dungotona",
  "Dutch",
  "East Indian",
  "Eastern Nigritic",
  "Egyptian",
  "Emirati",
  "English",
  "Equatorial Bantu",
  "European",
  "Ewe",
  "Fallata",
  "Fataluku",
  "Fertit",
  "Filipino",
  "Finnish",
  "Fon",
  "French",
  "Fulani",
  "Fur",
  "Futunian",
  "Galoli",
  "Gamo",
  "Garifuuna",
  "Gedeo",
  "German",
  "Gibraltarian",
  "Gorani",
  "Greek",
  "Greenlandic",
  "Grusi",
  "Guan",
  "Guernsey",
  "Gujar",
  "Gujrati",
  "Gujrati British",
  "Gurage",
  "Gurma",
  "Gurung",
  "Gurunsi",
  "Guyanian",
  "Gypsy or Irish Traveller",
  "Hadiya",
  "Haitian",
  "Hakka",
  "Han Chinese",
  "Hani",
  "Hausa",
  "Hazara",
  "Hiligaynon",
  "Hispanic",
  "Hispanic and Latino American",
  "Hla'alua",
  "Hmong",
  "Hoa",
  "Hokio",
  "Hui",
  "Hungarian",
  "Hutu",
  "I am not on your list (please add)",
  "Ibibio",
  "Ijaw",
  "Indian",
  "Indian Tamil",
  "Indignious (original people of my land)",
  "Indo-Aryan",
  "Indochinese",
  "Indonesian",
  "Iraqi",
  "Irish",
  "Irish Traveller",
  "Ismaili",
  "Italian",
  "Iteso",
  "Izon",
  "Jamaican",
  "Japanese",
  "Jews",
  "Jews African",
  "Jews Algerian",
  "Jews American",
  "Jews Ashkenazi",
  "Jews Asian",
  "Jews Berber",
  "Jews British",
  "Jews European",
  "Jews Israeli",
  "Jews Libyan",
  "Jews Maghrebi",
  "Jews Middle Eastern",
  "Jews Mizrahi",
  "Jews Moroccan",
  "Jews other",
  "Jews Palestinian",
  "Jews Persian",
  "Jews Russian",
  "Jews Sephardi",
  "Jews Tunisian",
  "Jordanian",
  "Kabye",
  "Kaka'i",
  "Kakwa",
  "Kalanga",
  "Kalenjin",
  "Kamba",
  "Kami",
  "Kanak",
  "Kanakaravu",
  "Kanuri",
  "Kaonde",
  "Karakalpak",
  "Karen",
  "Katong",
  "Kavalan",
  "Kazakh",
  "Kefficho",
  "Kemak",
  "Kgalagdi",
  "Khmer",
  "Khmou",
  "Kikuyu",
  "Kimbundu",
  "Kinh ",
  "Kirdi",
  "Kisii",
  "Koiri",
  "Korean",
  "Kosovar",
  "Kuku",
  "Kurd",
  "Kurdish",
  "Kuwaiti",
  "Kyrghyz ",
  "Kyrgyg",
  "Lala",
  "Lamba",
  "Langi",
  "Lango",
  "Lao",
  "Latino",
  "Latvian",
  "Lebanese",
  "Lenje",
  "Levantine",
  "Lezghin",
  "Lhotshampas",
  "Li",
  "Libyan",
  "Liechtensteiner",
  "Limbu",
  "Lithuanian",
  "Llcano",
  "LLonggo",
  "Lndi",
  "Lobi",
  "Lomwe",
  "Lozi",
  "Lue",
  "Lugbara",
  "Luhya",
  "Lunda",
  "Luo",
  "Lur",
  "Luvale",
  "Luxembourger",
  "Maasaai",
  "Macedonian",
  "Madurese",
  "Magar",
  "Makong",
  "Malay",
  "Malayo-Indonesian",
  "Malayo-Polynesian",
  "Malayo-Polynesian#Tetun ",
  "Malaysian",
  "Maldivian",
  "Malinke",
  "Malinke ",
  "Maltese",
  "Mambwe",
  "Manchu",
  "Mandari",
  "Mande",
  "Mandija",
  "Maori",
  "Maroon",
  "Mauritanian",
  "Maya",
  "M'baka",
  "Mboum",
  "Mbunda",
  "Melanesian",
  "Melanesian-papuna",
  "Membai",
  "Meru",
  "Mestico",
  "Mestizo",
  "Mestizo (Mixed Amerindian and White)",
  "Mexican",
  "Mexican American",
  "Miao",
  "Micronesian",
  "Minangkabau",
  "Mixed African",
  "Mixed Arab",
  "Mixed ethnicity",
  "Mixed European and Native African",
  "Mixed Heritage ",
  "Mole-Dagbon",
  "Molodovan",
  "Mon",
  "Mong",
  "Mongol",
  "Mongolian",
  "Montenegrin",
  "Moravian",
  "Moroccan ",
  "Mossi",
  "Mozambiquian",
  "Muhajirs",
  "Mujikenda",
  "Multiple ethnic background",
  "Multiracial ",
  "Muong",
  "Murie",
  "Namwanga",
  "Native Hawaaiian",
  "Native Hawaiian",
  "Ndebele",
  "Ndogo",
  "Neapalian",
  "Nepali",
  "New Zealander",
  "Newar",
  "Ngalop",
  "Ngoni",
  "Niger",
  "Nigerian",
  "Ni-vanuatu",
  "Non-Melanesian",
  "Northern Irish",
  "Northwestern Bantu",
  "Norwegian",
  "Nsenga",
  "Nuba",
  "Nuer (Naath)",
  "Nung",
  "Nuristani",
  "Nusairi",
  "Omani",
  "Orang Asli",
  "Oromo",
  "Other British",
  "Ottamari",
  "Ovimbundu",
  "Pacific Islander",
  "Paiwan",
  "Pakistani",
  "Pakistani Bangladeshi",
  "Palauan",
  "Palestinian",
  "Palestinian Christian",
  "Palestinian Jew",
  "Palestinian Muslim",
  "Pamiri",
  "Para-Gourma",
  "Pashai",
  "Pashtun",
  "Pathan",
  "Persian",
  "Perto Rican",
  "Peruvian",
  "Peuhi",
  "Phouthay",
  "Polish",
  "Polynesian",
  "Portuguese",
  "Punjabi",
  "Puyuma",
  "Qatari",
  "Qizilbash",
  "Rai",
  "Rakhine",
  "Romani",
  "Romanian",
  "Rukai",
  "Russian",
  "Ruthenian",
  "Sabaean-Mandaean",
  "Saint Lucian",
  "Saint Maartenian",
  "Saisiyat",
  "Sakizaya",
  "Samoan",
  "Sara",
  "Saraiki",
  "Sarki",
  "Sasak",
  "Saudi Arabian",
  "Al-Hijazi",
  "Scottish",
  "Scottish Syrian",
  "Seediq",
  "Sena",
  "Senagalese",
  "Senufo",
  "Serb",
  "Serbian",
  "Setswaan",
  "Shabak",
  "Shan",
  "Shilluk (Chollio)",
  "Shona",
  "Sidama",
  "Silte",
  "Sindhi",
  "Sinhalese",
  "Slavic",
  "Slovak",
  "Slovene",
  "Somali",
  "Songhi",
  "Soninke",
  "Sotho",
  "South American",
  "South Asian",
  "Spanish",
  "Sri Lankian",
  "St Helenian",
  "Sudanese",
  "Sundanese",
  "Surinamese",
  "Susu",
  "Swedish",
  "Swiss",
  "Sylheti",
  "Syrian",
  "Tagalog",
  "TAhitian",
  "Tai",
  "Tajik",
  "Talysh",
  "Tamang",
  "Tamil",
  "Tatar",
  "Teli",
  "Tem",
  "Thai",
  "Thakuri",
  "Thao",
  "Tharu",
  "Tibetan",
  "Tigray",
  "Tigrinya",
  "Tivo",
  "Togolese",
  "Tokelauan",
  "Tokodede",
  "Tonga Chewa",
  "Tongan",
  "Truku",
  "Tsonga",
  "Tsou",
  "Tswaana",
  "Tswan",
  "Tuareg",
  "Tuareg Belia",
  "Tuba",
  "Tujia",
  "Tumbuku",
  "Tunisian",
  "Turkana",
  "Turkic",
  "Turkish",
  "Turkmen",
  "Turkmen and Trkic",
  "Turkoman",
  "Tusi",
  "Tuvalian l -Kiribati",
  "Tuvaluan",
  "Tuvaluan (other)",
  "UAE",
  "Uighur",
  "Ukranian",
  "Uruguayan",
  "Ushi",
  "Uyghur",
  "Uzbek",
  "Venezuelan",
  "Vietnamese",
  "Vlach",
  "Wallisian",
  "Waray",
  "Welaita",
  "Welsh",
  "Welsh Syrian",
  "White",
  "White American ",
  "White and Asian",
  "White and Black African",
  "White and Black Caribbean",
  "White British",
  "Yadav",
  "Yagnobi",
  "Yakoma",
  "Yami",
  "Yao",
  "Yemeni",
  "Yezidi",
  "Yezidi (Kurd)",
  "Yi",
  "Yoa-Lokpa",
  "Yoruba",
  "Yoruba Igbo",
  "Zambian",
  "Zanzibar-Arab",
  "Zarma ",
  "Zhuang",
];

export default ethnicities;
