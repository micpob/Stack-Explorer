const sites = [
  {name: "3D Printing",value:"threedprinting"},
  {name: "Academia", value:"academia"},
  {name: "Amateur Radio", value:"ham"},
  {name: "Android Enthusiasts", value:"android"},
  {name: "Anime & Manga", value:"anime"},
  {name: "Arduino", value:"arduino"},
  {name: "Arqade", value:"gaming"},
  {name: "Artificial Intelligence", value:"ai"},
  {name: "Arts & Crafts", value:"crafts"},
  {name: "Ask Different", value:"apple"},
  {name: "Ask Patents", value:"patents"},
  {name: "Ask Ubuntu", value:"askubuntu"},
  {name: "Astronomy", value:"astronomy"},
  {name: "Aviation", value:"aviation"},
  {name: "Biblical Hermeneutics", value:"hermeneutics"},
  {name: "Bicycles", value:"bicycles"},
  {name: "Bioacoustics", value:"bioacoustics"},
  {name: "Bioinformatics", value:"bioinformatics"},
  {name: "Biology", value:"biology"},
  {name: "Blender", value:"blender"},
  {name: "Board & Card Games", value:"boardgames"},
  {name: "Bricks", value:"bricks"},
  {name: "Buddhism", value:"buddhism"},
  {name: "Chemistry", value:"chemistry"},
  {name: "Chess", value:"chess"},
  {name: "Chinese Language", value:"chinese"},
  {name: "Christianity", value:"christianity"},
  {name: "CiviCRM", value:"civicrm"},
  {name: "Code Golf", value:"codegolf"},
  {name: "Code Review", value:"codereview"},
  {name: "Coffee", value:"coffee"},
  {name: "Community Building", value:"communitybuilding"},
  {name: "Computational Science", value:"scicomp"},
  {name: "Computer Graphics", value:"computergraphics"},
  {name: "Computer Science", value:"cs"},
  {name: "Computer Science Educators", value:"cseducators"},
  {name: "Constructed Languages", value:"conlang"},
  {name: "Craft CMS", value:"craftcms"},
  {name: "Cross Validated", value:"stats"},
  {name: "Cryptography", value:"crypto"},
  {name: "CS50", value:"cs50"},
  {name: "Data Science", value:"datascience"},
  {name: "Database Administrators", value:"dba"},
  {name: "DevOps", value:"devops"},
  {name: "Drones and Model Aircraft", value:"drones"},
  {name: "Drupal Answers", value:"drupal"},
  {name: "Earth Science", value:"earthscience"},
  {name: "Ebooks", value:"ebooks"},
  {name: "Economics", value:"economics"},
  {name: "Electrical Engineering", value:"electronics"},
  {name: "elementary OS", value:"elementaryos"},
  {name: "Emacs", value:"emacs"},
  {name: "Engineering", value:"engineering"},
  {name: "English Language & Usage", value:"english"},
  {name: "English Language Learners", value:"ell"},
  {name: "Esperanto Language", value:"esperanto"},
  {name: "Expatriates", value:"expatriates"},
  {name: "ExpressionEngine© Answers", value:"expressionengine"},
  {name: "Freelancing", value:"freelancing"},
  {name: "French Language", value:"french"},
  {name: "Game Development", value:"gamedev"},
  {name: "Gardening & Landscaping", value:"gardening"},
  {name: "Genealogy & Family History", value:"genealogy"},
  {name: "Geographic Information Systems", value:"gis"},
  {name: "German Language", value:"german"},
  {name: "Graphic Design", value:"graphicdesign"},
  {name: "Hardware Recommendations", value:"hardwarerecs"},
  {name: "Hinduism", value:"hinduism"},
  {name: "History", value:"history"},
  {name: "History of Science and Mathematics", value:"hsm"},
  {name: "Home Improvement", value:"diy"},
  {name: "Information Security", value:"security"},
  {name: "Internet of Things", value:"iot"},
  {name: "Interpersonal Skills", value:"interpersonal"},
  {name: "Islam", value:"islam"},
  {name: "Italian Language", value:"italian"},
  {name: "Japanese Language", value:"japanese"},
  {name: "Joomla", value:"joomla"},
  {name: "Korean Language", value:"korean"},
  {name: "Language Learning", value:"languagelearning"},
  {name: "Latin Language", value:"latin"},
  {name: "Law", value:"law"},
  {name: "Lifehacks", value:"lifehacks"},
  {name: "Linguistics", value:"linguistics"},
  {name: "Literature", value:"literature"},
  {name: "Magento", value:"magento"},
  {name: "Martial Arts", value:"martialarts"},
  {name: "Mathematica", value:"mathematica"},
  {name: "Mathematics", value:"math"},
  {name: "Mathematics Educators", value:"matheducators"},
  {name: "MathOverflow", value:"mathoverflownet"},
  {name: "Matter Modeling", value:"mattermodeling"},
  {name: "Medical Sciences", value:"medicalsciences"},
  {name: "Meta Stack Exchange", value:"meta"},
  {name: "Mi Yodeya", value:"judaism"},
  {name: "Motor Vehicle Maintenance & Repair", value:"mechanics"},
  {name: "Movies & TV", value:"movies"},
  {name: "Music Fans", value:"musicfans"},
  {name: "Music: Practice & Theory", value:"music"},
  {name: "Mythology & Folklore", value:"mythology"},
  {name: "Network Engineering", value:"networkengineering"},
  {name: "Open Data", value:"opendata"},
  {name: "Open Source", value:"opensource"},
  {name: "Operations Research", value:"or"},
  {name: "Parenting", value:"parenting"},
  {name: "Personal Finance & Money", value:"money"},
  {name: "Pets", value:"pets"},
  {name: "Philosophy", value:"philosophy"},
  {name: "Photography", value:"photo"},
  {name: "Physical Fitness", value:"fitness"},
  {name: "Physics", value:"physics"},
  {name: "Politics", value:"politics"},
  {name: "Portuguese Language", value:"portuguese"},
  {name: "Project Management", value:"pm"},
  {name: "Proof Assistants", value:"proofassistants"},
  {name: "Psychology & Neuroscience", value:"psychology"},
  {name: "Puzzling", value:"puzzling"},
  {name: "Quantitative Finance", value:"quant"},
  {name: "Quantum Computing", value:"quantumcomputing"},
  {name: "Raspberry Pi", value:"raspberrypi"},
  {name: "Retrocomputing", value:"retrocomputing"},
  {name: "Reverse Engineering", value:"reverseengineering"},
  {name: "Robotics", value:"robotics"},
  {name: "Role-playing Games", value:"rpg"},
  {name: "Russian Language", value:"russian"},
  {name: "Salesforce", value:"salesforce"},
  {name: "Science Fiction & Fantasy", value:"scifi"},
  {name: "Seasoned Advice", value:"cooking"},
  {name: "Server Fault", value:"serverfault"},
  {name: "SharePoint", value:"sharepoint"},
  {name: "Signal Processing", value:"dsp"},
  {name: "Sitecore", value:"sitecore"},
  {name: "Skeptics", value:"skeptics"},
  {name: "Software Engineering", value:"softwareengineering"},
  {name: "Software Quality Assurance & Testing", value:"sqa"},
  {name: "Software Recommendations", value:"softwarerecs"},
  {name: "Sound Design", value:"sound"},
  {name: "Space Exploration", value:"space"},
  {name: "Spanish Language", value:"spanish"},
  {name: "Sports", value:"sports"},
  {name: "Stack Apps", value:"stackapps"},
  {name: "Stack Overflow", value:"stackoverflow"},
  {name: "Stack Overflow en español", value:"esstackoverflow"},
  {name: "スタック・オーバーフロー", value:"jastackoverflow"},
  {name: "Stack Overflow em Português", value:"ptstackoverflow"},
  {name: "Stack Overflow на русском", value:"rustackoverflow"},
  {name: "Super User", value:"superuser"},
  {name: "Sustainable Living", value:"sustainability"},
  {name: "TeX - LaTeX", value:"tex"},
  {name: "The Great Outdoors", value:"outdoors"},
  {name: "The Workplace", value:"workplace"},
  {name: "Theoretical Computer Science", value:"cstheory"},
  {name: "Tor", value:"tor"},
  {name: "Travel", value:"travel"},
  {name: "Tridion", value:"tridion"},
  {name: "Ukrainian Language", value:"ukrainian"},
  {name: "Unix & Linux", value:"unix"},
  {name: "User Experience", value:"ux"},
  {name: "Veganism & Vegetarianism", value:"vegetarianism"},
  {name: "Vi and Vim", value:"vi"},
  {name: "Video Production", value:"video"},
  {name: "Web Applications", value:"webapps"},
  {name: "Webmasters", value:"webmasters"},
  {name: "Woodworking", value:"woodworking"},
  {name: "WordPress Development", value:"wordpress"},
  {name: "Worldbuilding", value:"worldbuilding"},
  {name: "Writing", value:"writing"},
  {name: "Русский язык", value:"rus"}
]

export default {sites}