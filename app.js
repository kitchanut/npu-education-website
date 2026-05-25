// Global Application State
let currentLang = 'th';
let hasStatsAnimated = false;

// Theme Controller (Light/Dark Mode)
const themeToggleBtn = document.getElementById('theme-toggle');
const mobileThemeToggleBtn = document.getElementById('mobile-theme-toggle');

function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
}

function toggleTheme() {
    if (document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
    } else {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    }
}

if (themeToggleBtn) themeToggleBtn.addEventListener('click', toggleTheme);
if (mobileThemeToggleBtn) mobileThemeToggleBtn.addEventListener('click', toggleTheme);

// Initialize Theme
initTheme();

// Mobile Navigation Toggle
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const menuIcon = document.getElementById('menu-icon');

function toggleMobileMenu() {
    if (mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.remove('hidden');
        setTimeout(() => {
            mobileMenu.style.maxHeight = '500px';
        }, 10);
        menuIcon.classList.remove('fa-bars');
        menuIcon.classList.add('fa-xmark');
    } else {
        mobileMenu.style.maxHeight = '0';
        setTimeout(() => {
            mobileMenu.classList.add('hidden');
        }, 300);
        menuIcon.classList.remove('fa-xmark');
        menuIcon.classList.add('fa-bars');
    }
}

if (menuBtn) menuBtn.addEventListener('click', toggleMobileMenu);

// Language Toggle Dropdown Controller
const langBtn = document.getElementById('lang-btn');
const langDropdown = document.getElementById('lang-dropdown');
const currentLangText = document.getElementById('current-lang-text');
const mobileLangBtn = document.getElementById('mobile-lang-btn');

if (langBtn) {
    langBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        langDropdown.classList.toggle('hidden');
    });
}

// Close language dropdown if clicked outside
document.addEventListener('click', () => {
    if (langDropdown) langDropdown.classList.add('hidden');
});

// Mobile language toggle quick button
if (mobileLangBtn) {
    mobileLangBtn.addEventListener('click', () => {
        const nextLang = currentLang === 'th' ? 'en' : 'th';
        switchLang(nextLang);
    });
}

// Curriculum Data Structure
const curriculumData = {
    bachelor: [
        {
            id: 'b-thai',
            th: {
                title: 'สาขาวิชาภาษาไทย',
                degree: 'ครุศาสตรบัณฑิต (ค.บ. 4 ปี)',
                duration: '4 ปี (8 ภาคการศึกษา)',
                overview: 'มุ่งเน้นการผลิตครูภาษาไทยที่มีความเชี่ยวชาญด้านหลักภาษา วรรณคดี และทักษะการสอนสมัยใหม่ สอดรับกับอัตลักษณ์วิชาชีพครูยุคศตวรรษที่ 21 และวัฒนธรรมการใช้ภาษาอย่างถูกต้องงามสง่าในลุ่มน้ำโขง',
                career: ['ครูสอนวิชาภาษาไทยในโรงเรียนรัฐบาลและเอกชน', 'นักวิชาการศึกษาด้านการสอนวิชาภาษาไทย', 'นักวิจารณ์วรรณคดีและงานเขียน', 'ผู้สร้างคอนเทนต์ด้านภาษาไทยและศิลปวัฒนธรรม']
            },
            en: {
                title: 'Thai Language Program',
                degree: 'Bachelor of Education (B.Ed. 4 Years)',
                duration: '4 Years (8 Semesters)',
                overview: 'Focuses on producing Thai teachers proficient in linguistics, classic and modern literature, and innovative pedagogical tools. Aligned with 21st-century educator competencies and cultural integration in the Mekong basin.',
                career: ['Thai Language Teacher in public and private schools', 'Educational Academic Specialist in Thai language', 'Literary critic and professional writer', 'Content creator specializing in Thai language and arts']
            }
        },
        {
            id: 'b-english',
            th: {
                title: 'สาขาวิชาภาษาอังกฤษ',
                degree: 'ครุศาสตรบัณฑิต (ค.บ. 4 ปี)',
                duration: '4 ปี (8 ภาคการศึกษา)',
                overview: 'เน้นทักษะภาษาอังกฤษระดับสูง ความเข้าใจข้ามวัฒนธรรม และนวัตกรรมการสอนภาษา (TESOL) เพื่อเตรียมพร้อมครูรุ่นใหม่สู่ระบบโรงเรียนสองภาษาและระดับสากล',
                career: ['ครูสอนภาษาอังกฤษทุกระดับชั้น', 'ผู้สอนภาษาอังกฤษในสถาบันภาษาเอกชน', 'ผู้แปล ล่าม และประสานงานองค์กรต่างประเทศ', 'นักวิเทศสัมพันธ์ในโรงเรียนหรือมหาวิทยาลัย']
            },
            en: {
                title: 'English Language Program',
                degree: 'Bachelor of Education (B.Ed. 4 Years)',
                duration: '4 Years (8 Semesters)',
                overview: 'Emphasizes advanced English proficiency, intercultural communication, and innovative language teaching methods (TESOL) to prepare the next generation of global and bilingual school teachers.',
                career: ['English Teacher in primary and secondary schools', 'ESL/EFL Educator in private institutes', 'Translator, interpreter, and international relations liaison', 'Education advisor or international coordinator']
            }
        },
        {
            id: 'b-math',
            th: {
                title: 'สาขาวิชาคณิตศาสตร์',
                degree: 'ครุศาสตรบัณฑิต (ค.บ. 4 ปี)',
                duration: '4 ปี (8 ภาคการศึกษา)',
                overview: 'พัฒนาครูคณิตศาสตร์ที่มีตรรกะ ทักษะการแก้ปัญหา และเทคนิคการสอนเชิงรุก (Active Learning) ที่ทำให้วิชาคณิตศาสตร์เข้าใจง่ายและสนุกสำหรับเด็ก',
                career: ['ครูคณิตศาสตร์ในโรงเรียนประถมและมัธยม', 'นักวิชาการและผู้พัฒนาหลักสูตรสื่อคณิตศาสตร์', 'ผู้ออกแบบหลักสูตรกิจกรรมและค่ายวิชาการคณิตศาสตร์', 'นักวิเคราะห์ข้อมูลและแบบประเมินผลการเรียนรู้']
            },
            en: {
                title: 'Mathematics Program',
                degree: 'Bachelor of Education (B.Ed. 4 Years)',
                duration: '4 Years (8 Semesters)',
                overview: 'Nurtures mathematics teachers with logical reasoning, advanced problem-solving skills, and active learning strategies that make mathematics intuitive and engaging for students.',
                career: ['Math Teacher in primary and secondary schools', 'Curriculum designer and textbook developer', 'Developer of mathematics camps and STEM learning materials', 'Academic analyst and educational evaluator']
            }
        },
        {
            id: 'b-comp',
            th: {
                title: 'สาขาวิชาคอมพิวเตอร์',
                degree: 'ครุศาสตรบัณฑิต (ค.บ. 4 ปี)',
                duration: '4 ปี (8 ภาคการศึกษา)',
                overview: 'ผลิตครูเทคโนโลยีสารสนเทศที่เชี่ยวชาญการเขียนโค้ด วิทยาการคำนวณ (Computing Science) และการประยุกต์ใช้ AI เพื่อพัฒนาศักยภาพผู้เรียนในโรงเรียนอย่างก้าวล้ำ',
                career: ['ครูสอนวิทยาการคำนวณและคอมพิวเตอร์', 'นักพัฒนาสื่อการสอนดิจิทัลและอีเลิร์นนิง', 'นักวิเคราะห์ระบบและแอดมินเครือข่ายโรงเรียน', 'ผู้เชี่ยวชาญเทคโนโลยีการศึกษาและนวัตกรรมการเรียนรู้']
            },
            en: {
                title: 'Computer Education Program',
                degree: 'Bachelor of Education (B.Ed. 4 Years)',
                duration: '4 Years (8 Semesters)',
                overview: 'Produces IT and computer teachers specializing in coding, computing science, digital media, and practical educational AI applications to transform digital classrooms.',
                career: ['Computing Science and Computer Education Teacher', 'Instructional designer and e-learning developer', 'School system analyst and network administrator', 'Educational technology consultant and trainer']
            }
        },
        {
            id: 'b-early',
            th: {
                title: 'สาขาวิชาการศึกษาปฐมวัย',
                degree: 'ครุศาสตรบัณฑิต (ค.บ. 4 ปี)',
                duration: '4 ปี (8 ภาคการศึกษา)',
                overview: 'มุ่งสร้างผู้เชี่ยวชาญด้านพัฒนาการเด็กปฐมวัย (0-6 ปี) บนฐานการเรียนรู้ผ่านการเล่น จิตวิทยาเชิงบวก และกระบวนการฟูมฟักทักษะสมอง EF เพื่ออนาคตที่ดีที่สุดของลูกหลาน',
                career: ['ครูโรงเรียนอนุบาลและศูนย์พัฒนาเด็กเล็ก', 'ผู้บริหารสถาบันปฐมวัยและเนอสเซอรี่', 'ผู้เชี่ยวชาญและนักวิชาการพัฒนาการเด็ก', 'นักออกแบบของเล่นและนวัตกรรมเพื่อการเรียนรู้ของเด็ก']
            },
            en: {
                title: 'Early Childhood Education Program',
                degree: 'Bachelor of Education (B.Ed. 4 Years)',
                duration: '4 Years (8 Semesters)',
                overview: 'Dedicated to cultivating child development professionals (ages 0-6) using play-based learning, positive psychology, and executive function (EF) training for optimal early growth.',
                career: ['Kindergarten Teacher and early child care center educator', 'Nursery director or early learning center entrepreneur', 'Early childhood development specialist', 'Designer of educational toys and kids learning experiences']
            }
        },
        {
            id: 'b-elem',
            th: {
                title: 'สาขาวิชาการประถมศึกษา',
                degree: 'ครุศาสตรบัณฑิต (ค.บ. 4 ปี)',
                duration: '4 ปี (8 ภาคการศึกษา)',
                overview: 'พัฒนาครูที่เชี่ยวชาญสหวิทยาการ สามารถสอนได้หลายกลุ่มสาระในระดับประถมศึกษา มุ่งประยุกต์ทักษะจิตวิทยาเด็กโตและการเรียนรู้แบบบูรณาการอย่างสร้างสรรค์',
                career: ['ครูสอนระดับประถมศึกษา (รอบด้าน)', 'นักวิชาการศึกษาประจำหน่วยงานการศึกษาประถม', 'ผู้เขียนและเรียบเรียงหนังสือเรียนระดับประถม', 'ผู้ให้บริการจัดค่ายพัฒนาคุณภาพเด็กเล็ก']
            },
            en: {
                title: 'Elementary Education Program',
                degree: 'Bachelor of Education (B.Ed. 4 Years)',
                duration: '4 Years (8 Semesters)',
                overview: 'Prepares versatile generalist primary school teachers capable of integrating multiple subject areas using comprehensive child psychology and project-based approaches.',
                career: ['Primary/Elementary School Teacher', 'Academic educator in primary education offices', 'Primary textbook writer and educational content creator', 'Coordinator of youth camps and development programs']
            }
        },
        {
            id: 'b-science',
            th: {
                title: 'สาขาวิชาวิทยาศาสตร์และเทคโนโลยี',
                degree: 'ครุศาสตรบัณฑิต (ค.บ. 4 ปี)',
                duration: '4 ปี (8 ภาคการศึกษา)',
                overview: 'เรียนรู้ผ่านการสืบเสาะวิทยาศาสตร์ การทดลอง และสะเต็มศึกษา (STEM Education) เพื่อกระตุ้นต่อมความคิดเชิงวิเคราะห์และความคิดสร้างสรรค์ในทุกคาบวิชา',
                career: ['ครูสอนวิทยาศาสตร์ระดับประถมและมัธยมต้น', 'วิทยากรประจำพิพิธภัณฑ์วิทยาศาตร์หรือศูนย์เรียนรู้', 'นักวิจัยและผู้ช่วยห้องปฏิบัติการทางการศึกษา', 'ผู้ออกแบบหลักสูตรนวัตกรรมและเทคโนโลยีทางวิทยาศาสตร์']
            },
            en: {
                title: 'Science and Technology Program',
                degree: 'Bachelor of Education (B.Ed. 4 Years)',
                duration: '4 Years (8 Semesters)',
                overview: 'Focuses on scientific inquiry, lab experimentation, and STEM integration to ignite logical thinking and analytical investigation in primary and junior high schools.',
                career: ['General Science Teacher in schools', 'Educator in science museums or discovery centers', 'Educational lab research associate', 'Instructional designer for science and technology initiatives']
            }
        },
        {
            id: 'b-social',
            th: {
                title: 'สาขาวิชาสังคมศึกษา',
                degree: 'ครุศาสตรบัณฑิต (ค.บ. 4 ปี)',
                duration: '4 ปี (8 ภาคการศึกษา)',
                overview: 'มุ่งมั่นสร้างครูที่มีความลุ่มลึกด้านประวัติศาสตร์ ภูมิศาสตร์ การพัฒนาสังคม และหน้าที่พลเมือง เสริมสร้างทักษะการคิดวิเคราะห์ข้อมูลข่าวสารเพื่อบ่มเพาะพลเมืองที่ดีของโลก',
                career: ['ครูสอนสังคมศึกษา ประวัติศาสตร์ และหน้าที่พลเมือง', 'นักวิชาการพัฒนาสังคมและวัฒนธรรม', 'นักพัฒนาชุมชนหรือบุคลากรในหน่วยงานรัฐ', 'ผู้เขียนบทความทางประวัติศาสตร์และสังคมศาสตร์']
            },
            en: {
                title: 'Social Studies Program',
                degree: 'Bachelor of Education (B.Ed. 4 Years)',
                duration: '4 Years (8 Semesters)',
                overview: 'Dedicated to building teachers with solid foundations in history, geography, civic duty, and global citizenship, preparing them to nurture critical thinkers of society.',
                career: ['Social Studies, History, and Civics Teacher', 'Social development officer in community organizations', 'Government agency personnel or community organizer', 'Historical and geopolitical writer']
            }
        },
        {
            id: 'b-art',
            th: {
                title: 'สาขาวิชาศิลปศึกษา ดนตรีศึกษา และนาฏศิลป์ศึกษา',
                degree: 'ครุศาสตรบัณฑิต (ค.บ. 4 ปี)',
                duration: '4 ปี (8 ภาคการศึกษา)',
                overview: 'สร้างครูศิลปินที่มีจิตวิญญาณแห่งสุนทรียศาสตร์ ทั้งศิลปะ ดนตรี และการแสดงพื้นบ้านลุ่มน้ำโขง สามารถจุดประกายพรสวรรค์และความสุนทรีย์ให้แก่เด็กอย่างยั่งยืน',
                career: ['ครูสอนศิลปะ ดนตรี หรือนาฏศิลป์ในโรงเรียน', 'ศิลปินอิสระและผู้สอนสุนทรียภาพเฉพาะด้าน', 'ผู้จัดกิจกรรมนันทนาการและเทศกาลศิลปวัฒนธรรม', 'ผู้กำกับการแสดงหรือผู้ออกแบบท่ารำทางศิลปกรรม']
            },
            en: {
                title: 'Art, Music, and Performing Arts Program',
                degree: 'Bachelor of Education (B.Ed. 4 Years)',
                duration: '4 Years (8 Semesters)',
                overview: 'Combines artistic creation, music theory, and traditional Mekong performing arts with pedagogical skills to ignite aesthetic appreciation in children.',
                career: ['Art, Music, or Performing Arts Teacher', 'Independent creative artist or art instructor', 'Organizer of cultural festivals and recreation programs', 'Stage director or traditional choreography designer']
            }
        }
    ],
    master: [
        {
            id: 'm-admin',
            th: {
                title: 'สาขาวิชาการบริหารและพัฒนาการศึกษา',
                degree: 'ครุศาสตรมหาบัณฑิต (ค.ม. 2 ปี)',
                duration: '2 ปี (4 ภาคการศึกษา)',
                overview: 'เพื่อสร้างผู้บริหารโรงเรียน คณบดี และผู้นำทางการศึกษาในอนาคต มุ่งเน้นการวางแผนยุทธศาสตร์ นวัตกรรมการจัดการศึกษา และภาวะผู้นำทางวิชาการ',
                career: ['ผู้อำนวยการโรงเรียนและผู้ช่วยผู้อำนวยการ', 'ผู้บริหารระดับสูงในหน่วยงานทางการศึกษาและสำนักงานเขต', 'นักวิชาการและผู้วางนโยบายการศึกษาของรัฐ', 'ผู้ประเมินสถานศึกษาภายนอก']
            },
            en: {
                title: 'Educational Administration and Development',
                degree: 'Master of Education (M.Ed. 2 Years)',
                duration: '2 Years (4 Semesters)',
                overview: 'Designed to build future school directors, education heads, and academic leaders. Focuses on strategic management, policy planning, and institutional development.',
                career: ['School Principal or Assistant Principal', 'Education director in local and regional offices', 'Education policy maker and academic consultant', 'Educational quality assessor and supervisor']
            }
        },
        {
            id: 'm-curriculum',
            th: {
                title: 'สาขาวิชาหลักสูตรและการสอน',
                degree: 'ครุศาสตรมหาบัณฑิต (ค.ม. 2 ปี)',
                duration: '2 ปี (4 ภาคการศึกษา)',
                overview: 'มุ่งเน้นการวิจัยเชิงลึกเพื่อการพัฒนาหลักสูตรและการจัดกิจกรรมการเรียนรู้ล้ำสมัย เสริมทักษะการประเมินวิเคราะห์ประสิทธิภาพชั้นเรียนและการสร้างสื่อสมัยใหม่',
                career: ['หัวหน้างานวิชาการและผู้พัฒนาหลักสูตรประจำโรงเรียน', 'ศึกษานิเทศก์ประจำเขตพื้นที่การศึกษา', 'นักวิชาการอิสระด้านนวัตกรรมสิ่งพิมพ์ทางการศึกษา', 'ผู้จัดการศูนย์ออกแบบการเรียนรู้องค์กร']
            },
            en: {
                title: 'Curriculum and Instruction Program',
                degree: 'Master of Education (M.Ed. 2 Years)',
                duration: '2 Years (4 Semesters)',
                overview: 'Delves into deep research-based curriculum development, design of modern classrooms, active pedagogical tools, and academic evaluation techniques.',
                career: ['Head of Academic Affairs / Curriculum Developer in schools', 'Educational Supervisor in school districts', 'Independent researcher in educational publishing', 'Corporate learning experience director']
            }
        },
        {
            id: 'm-primary',
            th: {
                title: 'สาขาวิชานวัตกรรมการจัดการเรียนรู้ประถมศึกษา',
                degree: 'ครุศาสตรมหาบัณฑิต (ค.ม. 2 ปี)',
                duration: '2 ปี (4 ภาคการศึกษา)',
                overview: 'เพื่อยกระดับทักษะครูประถมศึกษาสู่การสร้างนวัตกรรมการเรียนรู้เชิงปฏิบัติการ การสร้างทฤษฎีห้องเรียนที่สนุก และพัฒนาผู้เรียนผ่านวิจัยปฏิบัติการในชั้นเรียน',
                career: ['ครูหัวหน้าระดับประถมศึกษา ผู้มีความเชี่ยวชาญสูง', 'ที่ปรึกษานวัตกรรมการสอนเด็กประถม', 'ผู้เขียนชุดแบบเรียนระดับประถมศึกษายุคใหม่', 'ผู้วิจัยและออกแบบการประเมินวิชาการประถม']
            },
            en: {
                title: 'Primary Learning Management Innovation',
                degree: 'Master of Education (M.Ed. 2 Years)',
                duration: '2 Years (4 Semesters)',
                overview: 'Aims to elevate primary school teachers by producing breakthrough hands-on learning innovations, active classroom research, and progressive child mentoring tools.',
                career: ['Expert Primary School Teacher / Grade Level Head', 'Consultant in child learning and innovative class tactics', 'Primary curriculum publisher and syllabus consultant', 'Researcher in elementary education model']
            }
        }
    ],
    doctoral: [
        {
            id: 'd-curriculum',
            th: {
                title: 'สาขาวิชาหลักสูตรและการสอน (ปร.ด.)',
                degree: 'ปรัชญาดุษฎีบัณฑิต (ปร.ด.)',
                duration: '3 ปี (6 ภาคการศึกษา)',
                overview: 'ระดับการศึกษาขั้นสูงสุดทางวิชาการ มุ่งค้นคว้าวิจัยนวัตกรรมหลักสูตรและการจัดศึกษาเพื่อแก้ปัญหาการเรียนรู้ระดับประเทศและนานาชาติ สร้างดุษฎีบัณฑิตที่เป็นเสาหลักทางวิชาการ',
                career: ['อาจารย์มหาวิทยาลัยและนักวิจัยสถาบันการศึกษา', 'ผู้นำและนักยุทธศาสตร์พัฒนาการเรียนรู้ระดับกระทรวง', 'นักวิชาการที่ปรึกษาด้านการสอนในสถาบันวิจัยชั้นนำ', 'ผู้คิดค้นทฤษฎีและนวัตกรรมนโยบายการเรียนการสอน']
            },
            en: {
                title: 'Curriculum and Instruction (Ph.D.)',
                degree: 'Doctor of Philosophy (Ph.D.)',
                duration: '3 Years (6 Semesters)',
                overview: 'The highest academic achievement in curriculum science. Dedicated to creating breakthrough educational research, formulating learning theories, and addressing macro-level education issues.',
                career: ['University Professor and Educational Researcher', 'National education strategist and Ministry policy maker', 'Consultant in elite research institutes and school systems', 'Founder of contemporary pedagogical theories and techniques']
            }
        },
        {
            id: 'd-admin',
            th: {
                title: 'สาขาวิชาการบริหารและพัฒนาการศึกษา (ค.ด.)',
                degree: 'ครุศาสตรดุษฎีบัณฑิต (ค.ด.)',
                duration: '3 ปี (6 ภาคการศึกษา)',
                overview: 'สำหรับผู้นำสถาบันระดับสูงและผู้กำหนดนโยบาย มุ่งเน้นการปฏิรูปการศึกษาในระนาบมหภาค การบริหารการพัฒนาที่ยั่งยืน และการจัดการทรัพยากรการศึกษาขั้นสากล',
                career: ['อธิการบดี คณบดี หรือผู้บริหารระดับสูงในมหาวิทยาลัย', 'ผู้อำนวยการเขตพื้นที่การศึกษาและเลขาธิการกองนโยบาย', 'ที่ปรึกษาระบบคุณภาพการศึกษาองค์กรใหญ่', 'นักประเมินและวิจัยทิศทางความมั่นคงทางการศึกษา']
            },
            en: {
                title: 'Educational Administration and Development (Ed.D.)',
                degree: 'Doctor of Education (Ed.D.)',
                duration: '3 Years (6 Semesters)',
                overview: 'Tailored for senior administrative figures, university executives, and top education officials to drive school reforms, sustainable governance, and high-impact educational models.',
                career: ['University President, Dean, or Higher Education Executive', 'Regional School District Director or Policy Secretary', 'Consultant for big education quality frameworks and audits', 'Lead researcher in educational economics and institutional security']
            }
        }
    ]
};

// Program Modal Open/Close
const progModal = document.getElementById('prog-modal');
const progModalContent = document.getElementById('prog-modal-content');
const pmLevel = document.getElementById('pm-level');
const pmTitle = document.getElementById('pm-title');
const pmDuration = document.getElementById('pm-duration');
const pmDegree = document.getElementById('pm-degree');
const pmBody = document.getElementById('pm-body');
const pmCareer = document.getElementById('pm-career');

function openProgModal(level, id) {
    const list = curriculumData[level];
    const program = list.find(item => item.id === id);
    if (!program) return;

    const data = program[currentLang];
    
    // Set text
    pmLevel.textContent = level === 'bachelor' ? (currentLang === 'th' ? 'ระดับปริญญาตรี (Undergraduate)' : 'Undergraduate Level (B.Ed.)') :
                          level === 'master' ? (currentLang === 'th' ? 'ระดับปริญญาโท (Graduate)' : 'Graduate Level (M.Ed.)') :
                          (currentLang === 'th' ? 'ระดับปริญญาเอก (Doctoral)' : 'Doctoral Level (Ph.D. / Ed.D.)');
    
    pmTitle.textContent = data.title;
    pmDuration.textContent = data.duration;
    pmDegree.textContent = data.degree;
    pmBody.textContent = data.overview;
    
    // Set career list
    pmCareer.innerHTML = '';
    data.career.forEach(item => {
        const li = document.createElement('li');
        li.className = 'flex items-start';
        li.innerHTML = `<i class="fa-solid fa-check text-artistic-emerald mr-2.5 mt-1 flex-shrink-0"></i> <span>${item}</span>`;
        pmCareer.appendChild(li);
    });

    // Animate Modal Open
    progModal.classList.remove('hidden');
    setTimeout(() => {
        progModalContent.classList.remove('scale-95', 'opacity-0');
        progModalContent.classList.add('scale-100', 'opacity-100');
    }, 50);
}

function closeProgModal() {
    progModalContent.classList.remove('scale-100', 'opacity-100');
    progModalContent.classList.add('scale-95', 'opacity-0');
    setTimeout(() => {
        progModal.classList.add('hidden');
    }, 300);
}

// Dean's Modal Controllers
const deanModal = document.getElementById('dean-modal');
const deanModalContent = document.getElementById('dean-modal-content');

function openDeanModal() {
    deanModal.classList.remove('hidden');
    setTimeout(() => {
        deanModalContent.classList.remove('scale-95', 'opacity-0');
        deanModalContent.classList.add('scale-100', 'opacity-100');
    }, 50);
}

function closeDeanModal() {
    deanModalContent.classList.remove('scale-100', 'opacity-100');
    deanModalContent.classList.add('scale-95', 'opacity-0');
    setTimeout(() => {
        deanModal.classList.add('hidden');
    }, 300);
}

// Curriculum Tab Switcher
let activeTab = 'bachelor';
function switchTab(tabId) {
    activeTab = tabId;
    
    // Toggle active button style
    const tabs = ['bachelor', 'master', 'doctoral'];
    tabs.forEach(t => {
        const btn = document.getElementById(`tab-btn-${t}`);
        
        if (t === tabId) {
            btn.className = 'w-full sm:w-auto px-6 py-2.5 font-prompt font-bold text-xs rounded-full transition duration-300 bg-ink-theme text-white dark:bg-artistic-yellow dark:text-slate-950 shadow-sm';
            document.getElementById(`tab-content-${t}`).classList.remove('hidden');
        } else {
            btn.className = 'w-full sm:w-auto px-6 py-2.5 font-prompt font-bold text-xs rounded-full transition duration-300 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800';
            document.getElementById(`tab-content-${t}`).classList.add('hidden');
        }
    });
    
    renderTabContent(tabId);
}

// Render dynamic curriculum card list based on language
function renderTabContent(tabId) {
    const container = document.getElementById(`tab-content-${tabId}`);
    if (!container) return;
    
    container.innerHTML = '';
    const list = curriculumData[tabId];
    
    list.forEach(program => {
        const data = program[currentLang];
        const card = document.createElement('div');
        card.className = 'bg-white dark:bg-slate-900 border border-slate-300/30 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex flex-col justify-between transform hover:-translate-y-1.5 transition duration-300 group';
        
        card.innerHTML = `
            <div>
                <span class="text-[9px] font-bold text-artistic-terracotta uppercase tracking-widest font-prompt">${data.degree}</span>
                <h4 class="text-base font-bold text-ink-theme dark:text-white mt-1.5 mb-3 group-hover:text-artistic-emerald transition font-prompt leading-snug">${data.title}</h4>
                <p class="text-xs font-sarabun text-slate-500 dark:text-slate-400 leading-relaxed mb-6 line-clamp-3">${data.overview}</p>
            </div>
            <div class="pt-4 border-t border-slate-300/10 dark:border-slate-800/80 flex justify-between items-center">
                <span class="text-[9px] font-bold text-slate-400 font-prompt"><i class="fa-regular fa-clock mr-1.5"></i>${data.duration}</span>
                <button onclick="openProgModal('${tabId}', '${program.id}')" class="text-xs font-bold text-ink-theme dark:text-artistic-yellow hover:text-artistic-emerald font-prompt flex items-center transition">
                    <span>${currentLang === 'th' ? 'ดูรายละเอียด' : 'Details'}</span>
                    <i class="fa-solid fa-angle-right ml-1"></i>
                </button>
            </div>
        `;
        
        container.appendChild(card);
    });
}

// Tuition Fee Estimator Logic
const tuitionRates = {
    bachelor: {
        regular: 13000,
        special: 16500,
        regularTotal: 104000,
        specialTotal: 132000
    },
    master: {
        regular: 22000,
        special: 26000,
        regularTotal: 88000,
        specialTotal: 104000
    },
    doctoral: {
        regular: 48000,
        special: 54000,
        regularTotal: 288000,
        specialTotal: 324000
    }
};

function updateCalcPrograms() {
    const lvlSelect = document.getElementById('calc-lvl');
    const progSelect = document.getElementById('calc-prog');
    if (!lvlSelect || !progSelect) return;
    
    const level = lvlSelect.value;
    const list = curriculumData[level];
    
    progSelect.innerHTML = '';
    
    list.forEach(program => {
        const option = document.createElement('option');
        option.value = program.id;
        option.textContent = program[currentLang].title;
        progSelect.appendChild(option);
    });
    
    calculateFee();
}

function calculateFee() {
    const lvlSelect = document.getElementById('calc-lvl');
    const semSelect = document.getElementById('calc-sem');
    const feeVal = document.getElementById('calc-fee-val');
    const totalVal = document.getElementById('calc-total-val');
    
    if (!lvlSelect || !semSelect || !feeVal || !totalVal) return;
    
    const level = lvlSelect.value;
    const semType = semSelect.value;
    
    const rate = tuitionRates[level][semType];
    const total = tuitionRates[level][`${semType}Total` || 'regularTotal'];
    
    // Formatting numbers with commas
    feeVal.textContent = rate.toLocaleString('th-TH');
    totalVal.textContent = total.toLocaleString('th-TH');
}

// Stat Counter Up Effect
function animateStats() {
    const stats = [
        { id: 'stat-students', end: 1200, duration: 2000 },
        { id: 'stat-employment', end: 98, duration: 1600 }
    ];
    
    stats.forEach(stat => {
        const el = document.getElementById(stat.id);
        if (!el) return;
        
        let start = 0;
        const target = stat.end;
        const stepTime = Math.abs(Math.floor(stat.duration / target));
        
        if (stat.id === 'stat-employment') {
            // Animating with decimals
            const decimalVal = parseFloat(el.getAttribute('data-decimal') || '0');
            const totalTarget = target + (decimalVal / 10);
            
            let current = 0.0;
            const stepDecimal = totalTarget / 100;
            const timer = setInterval(() => {
                current += stepDecimal;
                if (current >= totalTarget) {
                    current = totalTarget;
                    clearInterval(timer);
                }
                el.textContent = current.toFixed(1);
            }, 15);
        } else {
            const timer = setInterval(() => {
                start += Math.ceil(target / 100);
                if (start >= target) {
                    start = target;
                    clearInterval(timer);
                }
                el.textContent = start.toLocaleString('th-TH');
            }, 20);
        }
    });
}

// Stat Section Observer
const statsSection = document.getElementById('stat-students')?.closest('div.grid');
if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasStatsAnimated) {
                hasStatsAnimated = true;
                animateStats();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    observer.observe(statsSection);
}

// Form Submission Simulation
function handleFormSubmit(event) {
    event.preventDefault();
    const name = document.getElementById('form-name').value;
    const email = document.getElementById('form-email').value;
    const msg = document.getElementById('form-msg').value;
    
    if (!name || !email || !msg) return;
    
    // Simulate beautiful feedback
    const alertMsg = currentLang === 'th' ? 
        `ขอบคุณสำหรับข้อความติดต่อสอบถามคุณ ${name}! คณะครุศาสตร์ได้รับข้อมูลของท่านแล้ว และเจ้าหน้าที่จะดำเนินการติดต่อกลับผ่านอีเมล ${email} โดยเร็วที่สุดครับ` :
        `Thank you for reaching out, ${name}! The Faculty of Education has received your message. Our staff will get back to you via email ${email} shortly.`;
    
    alert(alertMsg);
    document.getElementById('contact-form').reset();
}

// Back to Top Button
const backToTopBtn = document.getElementById('back-to-top');
if (backToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopBtn.classList.remove('translate-y-20', 'opacity-0');
            backToTopBtn.classList.add('translate-y-0', 'opacity-100');
        } else {
            backToTopBtn.classList.remove('translate-y-0', 'opacity-100');
            backToTopBtn.classList.add('translate-y-20', 'opacity-0');
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Language Translation Translation Mapping (TH/EN)
const langTranslations = {
    th: {
        "site-title": "คณะครุศาสตร์ มหาวิทยาลัยนครพนม | Faculty of Education, Nakhon Phanom University",
        "nav-brand-sig": "EduNPU",
        "nav-home": "SERVICES",
        "nav-about": "ABOUT",
        "nav-curriculum": "CURRICULUMS",
        "nav-admission": "ADMISSIONS",
        "nav-news": "NEWS",
        "nav-contact": "CONTACT",
        "hero-email": "edu@npu.ac.th",
        "hero-est-title": "YEARS",
        "hero-est-sub": "FOUNDED EXPERIENCE",
        "hero-right-desc": "\"เรามุ่งเน้นการผลิตบัณฑิตครูให้มีคุณภาพตามมาตรฐานวิชาชีพ บนฐานการเรียนรู้จากการปฏิบัติจริง และการบ่มเพาะจิตวิญญาณความเป็นครูเพื่ออนาคตของชุมชนเชิงพื้นที่ลุ่มน้ำโขง\"",
        "seal-tag1": "NPU CERTIFIED",
        "seal-tag2": "PROFESSIONAL EDUCATOR",
        "p1-title": "หลักสูตรปริญญาตรี (B.Ed.)",
        "p1-sub": "9 สาขาวิชา | หลักสูตรครุศาสตรบัณฑิต 4 ปี",
        "p2-title": "หลักสูตรปริญญาโท (M.Ed.)",
        "p2-sub": "3 สาขาวิชา | การบริหารและนวัตกรรม",
        "p3-title": "หลักสูตรปริญญาเอก (Ph.D. / Ed.D.)",
        "p3-sub": "2 สาขาวิชา | ระดับวิจัยพัฒนาการศึกษาขั้นสูง",
        "help-title": "What do we support?",
        "help-desc": "คณะครุศาสตร์ มหาวิทยาลัยนครพนม มุ่งเน้นการสนับสนุนกระบวนการเรียนรู้และวางโครงสร้างเพื่อการผลิตบุคลากรการสอนที่เก่งกล้าสามารถในศตวรรษที่ 21 เราสนับสนุนเครื่องมือสื่อเทคโนโลยี ห้องปฏิบัติการอัจฉริยะ (Smart Classroom) ระบบประเมินค่าเทอมที่โปร่งใส และการสร้างเครือข่ายครูท้องถิ่นพัฒนาภูมิภาคลุ่มน้ำโขงเชิงประยุกต์ปฏิบัติจริง",
        "stat-stud-tag": "ACTIVE STUDENTS",
        "stat-employ-tag": "EMPLOYMENT RATE",
        "dean-badge": "DEAN'S MESSAGE",
        "dean-header": "\"ผลิตบัณฑิตครูคุณภาพ มุ่งสู่ปัญญาพัฒนาท้องถิ่นลุ่มน้ำโขง\"",
        "dean-excerpt": "\"ยินดีต้อนรับนักศึกษาและทุกท่านเข้าสู่เว็บไซต์ของคณะครุศาสตร์ มหาวิทยาลัยนครพนม คณะครุศาสตร์แห่งนี้เป็นสถาบันผลิตครูที่มุ่งเน้นการปฏิรูปการศึกษา พัฒนาครูอย่างต่อเนื่องให้เป็นมืออาชีพที่เพียบพร้อมด้วยทักษะวิชาชีพ ความเป็นผู้นำ และคุณธรรมความดีงาม...\"",
        "dean-btn-read": "อ่านสารจากคณบดีฉบับเต็ม (Read Full Message)",
        "time-badge": "ACADEMIC JOURNEY",
        "time-title": "ประวัติความเป็นมาของคณะ",
        "time1-role": "จัดตั้งคณะตามมติสภามหาวิทยาลัย",
        "time1-period": "1 ตุลาคม พ.ศ. 2558",
        "time1-body": "จัดตั้งขึ้นเพื่อแยกตัวการเรียนการสอนด้านการผลิตครูออกมาจากคณะศิลปศาสตร์และวิทยาศาสตร์ เพื่อให้เกิดความคล่องตัวในการบริการวิชาการและการจัดหลักสูตรครูที่ตรงเป้าหมาย",
        "time2-role": "ขยายหลักสูตรบัณฑิตศึกษา (ปริญญาโท-เอก)",
        "time2-period": "พ.ศ. 2561 - 2563",
        "time2-body": "เปิดสอนวิชาเฉพาะทางหลักสูตรและการสอน และการบริหารการศึกษาในระดับปริญญาโทและปริญญาเอก เพื่อพัฒนาผู้อำนวยการโรงเรียนและนักยุทธศาสตร์นโยบายการศึกษา",
        "time3-role": "มุ่งสู่สากลและนวัตกรรมห้องเรียนยุคดิจิทัล",
        "time3-period": "พ.ศ. 2567 - ปัจจุบัน",
        "time3-body": "ก้าวสู่การเป็นสถาบันชั้นนำในการผลิตและฝึกอบรมครูข้ามพรมแดนลุ่มแม่น้ำโขง พัฒนาจิตวิญญาณครูประยุกต์ทักษะ AI และสื่อความรู้ดิจิทัลเพื่อโรงเรียนท้องถิ่นอย่างยั่งยืน",
        "curr-badge": "DEGREE FRAMEWORK",
        "curr-title": "หลักสูตรการศึกษาของเรา",
        "tab-bachelor": "ปริญญาตรี (B.Ed.)",
        "tab-master": "ปริญญาโท (M.Ed.)",
        "tab-doctoral": "ปริญญาเอก (Ph.D. / Ed.D.)",
        "adm-badge": "ADMISSION SYSTEM",
        "adm-title": "พร้อมสมัครเรียนแล้วหรือยัง?",
        "adm-r1-title": "TCAS รอบที่ 1 Portfolio",
        "adm-r1-period": "ช่วงรับสมัคร: พ.ย. - ม.ค.",
        "adm-r1-body": "พิจารณาประวัติการเรียน ผลงานทางวิชาการ กิจกรรม และความสามารถพิเศษ ไม่ต้องสอบข้อเขียน",
        "adm-r2-title": "TCAS รอบที่ 2 Quota",
        "adm-r2-period": "ช่วงรับสมัคร: ก.พ. - เม.ย.",
        "adm-r2-body": "โควตาสำหรับผู้เรียนในพื้นที่ 17 จังหวัดภาคตะวันออกเฉียงเหนือ โครงการครูท้องถิ่น และโรงเรียนเครือข่าย",
        "adm-r3-title": "TCAS รอบที่ 3 Admission",
        "adm-r3-period": "ช่วงรับสมัคร: พ.ค.",
        "adm-r3-body": "ระบบการรับตรงร่วมกันระดับประเทศ สมัครผ่านเว็บ MyTCAS วัดผลสอบทางวิชาการทั่วไปและวิชาชีพครู (TPAT5)",
        "adm-r4-title": "TCAS รอบที่ 4 Direct",
        "adm-r4-period": "ช่วงรับสมัคร: มิ.ย.",
        "adm-r4-body": "รับตรงอิสระผ่านระบบมหาวิทยาลัยโดยตรง สำหรับผู้ที่ยังไม่ได้ยืนยันสิทธิ์ในรอบก่อนหน้า",
        "calc-title": "คำนวณจำลองประมาณการค่าธรรมเนียมการศึกษา",
        "calc-subtitle": "จำลองการประเมินค่าใช้จ่ายค่าเล่าเรียนเบื้องต้นของคณะครุศาสตร์ เพื่อการวางแผนการศึกษา",
        "calc-label-lvl": "เลือกระดับการศึกษา",
        "calc-label-prog": "เลือกสาขาวิชา",
        "calc-label-sem": "ประเภทของภาคการศึกษา",
        "lvl-opt-bachelor": "ปริญญาตรี (หลักสูตร 4 ปี)",
        "lvl-opt-master": "ปริญญาโท (หลักสูตร 2 ปี)",
        "lvl-opt-doctoral": "ปริญญาเอก",
        "sem-opt-reg": "ภาคการศึกษาปกติ (Regular Semester)",
        "sem-opt-spec": "ภาคการศึกษาพิเศษ/เสาร์-อาทิตย์ (Special Semester)",
        "calc-out-header": "ประมาณการค่าเทอมต่อเทอม",
        "calc-notice": "*เป็นค่าประมาณการ อาจมีการปรับเปลี่ยนตามประกาศของมหาวิทยาลัย",
        "calc-total-lbl": "รวมตลอดหลักสูตร",
        "calc-sch-lbl": "สิทธิ์ทุนการศึกษา",
        "calc-sch-val": "กยศ. / กอศ. / ทุนเรียนดี",
        "currency-baht": "บาท",
        "news-badge": "MY LATEST WORKS",
        "news-title": "ข่าวประชาสัมพันธ์ล่าสุด",
        "tag-academic": "วิชาการ",
        "tag-activity": "ข่าวกิจกรรม",
        "news1-title": "คณะครุศาสตร์ จัดการประชุมวิชาการระดับชาติว่าด้วยนวัตกรรมการศึกษาลุ่มน้ำโขง ครั้งที่ 9",
        "news1-excerpt": "การรวบรวมงานวิจัย ผลงานนวัตกรรมทางการเรียนรู้ของนักวิจัยและคณาจารย์จากทั่วประเทศ เพื่อยกระดับหลักสูตรการสอนโรงเรียนในอนุภูมิภาคลุ่มน้ำโขง...",
        "news2-title": "กิจกรรมเตรียมความพร้อมวิชาชีพครูสู่ยุคดิจิทัล สำหรับนักศึกษาฝึกอบรมการสอนในสถานศึกษาจริง",
        "news2-excerpt": "เตรียมความพร้อมทักษะจิตวิญญาณความเป็นครูและทักษะประยุกต์ใช้เทคโนโลยี AI เพื่อสนับสนุนการจัดการคลาสเรียนอย่างมีความสุขสร้างสรรค์...",
        "btn-news-read": "อ่านรายละเอียดข่าว",
        "test-badge": "PEOPLE TALK ABOUT US",
        "test-title": "เสียงสะท้อนจากความสำเร็จ",
        "t1-body": "\"การเรียนการสอนครูที่นี่เน้นการจับคู่และฝึกอบรมในสถาบันการศึกษาจริง คณาจารย์มีความทุ่มเทและดูแลอย่างใกล้ชิด อุปกรณ์เทคโนโลยีช่วยให้ฉันสามารถจัดบทเรียนสมัยใหม่ได้เก่งมากค่ะ\"",
        "t1-name": "ศรัญญา คนดี",
        "t1-role": "บัณฑิตครูภาษาไทยรุ่นที่ 7 | ปัจจุบันครูประจำการรัฐบาล",
        "t2-body": "\"หลักสูตรปริญญาเอกสาขาหลักสูตรและการสอนขัดเกลาวิสัยทัศน์ทางวิชาการเชิงลุ่มน้ำโขงได้ลุ่มลึกมาก ระบบจัดสอบวิจัยทำได้โปร่งใสและท้าทาย ช่วยเสริมภาวะผู้นำทางนวัตกรรมอย่างยอดเยี่ยม\"",
        "t2-name": "ดร.ธวัชชัย มีชัย",
        "t2-role": "ศิษย์เก่า ปร.ด. หลักสูตรและการสอน | ปัจจุบันผู้อำนวยการโรงเรียนมัธยม",
        "con-badge": "CONTACT US",
        "con-title": "ช่องทางการติดต่อ",
        "con-info-hdr": "สำนักงานคณบดี คณะครุศาสตร์",
        "con-lbl-addr": "ที่ตั้งสำนักงาน",
        "con-val-addr": "เลขที่ 167/1 หมู่ 8 บ้านเนินสะอาด ตำบลนาราชควาย อำเภอเมือง จังหวัดนครพนม 48000",
        "con-lbl-phone": "โทรศัพท์",
        "con-lbl-email": "อีเมลกลาง",
        "con-lbl-social": "ติดตามช่องทางโซเชียล",
        "form-hdr": "กล่องรับข้อความส่งด่วน",
        "form-name-lbl": "ชื่อ-นามสกุล ของท่าน",
        "form-email-lbl": "ที่อยู่อีเมลกลับ",
        "form-msg-lbl": "ข้อความติดต่อสอบถาม",
        "form-btn-submit": "ส่งข้อความสอบถาม",
        "btn-map-full": "ดูแผนที่ขนาดใหญ่บน Google Maps",
        "foot-cta": "Let's build a brighter educational future together.",
        "foot-cta-link": "Start by applying online now (เริ่มต้นด้วยการสมัครเรียนออนไลน์)",
        "link-npu": "Nakhon Phanom University",
        "link-ksp": "Kuru Sapa",
        "link-mhesi": "MHESI",
        "link-tcas": "MyTCAS",
        "dean-modal-badge": "สาส์นจากใจผู้บริหาร",
        "dean-modal-title": "สารจากคณบดี คณะครุศาสตร์ มหาวิทยาลัยนครพนม",
        "dean-modal-p1": "เรียน นักศึกษา คณาจารย์ บุคลากร และผู้เข้าเยี่ยมชมทุกท่าน",
        "dean-modal-p2": "ในนามของคณะครุศาสตร์ มหาวิทยาลัยนครพนม ผมมีความยินดีและภาคภูมิใจเป็นอย่างยิ่งที่ได้ต้อนรับทุกท่านเข้าสู่หน้าต่างประชาสัมพันธ์ของแหล่งผลิตวิชาชีพครูระดับแนวหน้าในพื้นที่อนุภูมิภาคลุ่มน้ำโขง",
        "dean-modal-p3": "คณะครุศาสตร์ของเราได้รับการสถาปนาขึ้นเพื่อเป็นหน่วยงานหลักในการยกระดับคุณภาพครูและพัฒนาวิชาชีพครูของประเทศ ภายใต้ปรัชญาการทำงานที่มุ่งสร้าง \"ครูที่มีหัวใจแห่งความรู้คู่คุณธรรมและจรรยาบรรณวิชาชีพอย่างสมบูรณ์\" เราเชื่อมั่นว่าการสร้างอนาคตต้องเริ่มต้นจากการวางรากฐานของครูผู้เรียนรู้ เพราะครูผู้มีคุณภาพเท่านั้นที่จะสร้างสรรค์สังคมแห่งปัญญาให้เกิดขึ้นได้อย่างแท้จริง",
        "dean-modal-p4": "ปัจจุบันเราพัฒนาโครงสร้างพื้นฐาน ห้องเรียนอัจฉริยะ (Smart Classroom) นวัตกรรมการจัดการศึกษาเชิงปฏิบัติการจริง (Work-based Learning) และความร่วมมืออย่างใกล้ชิดกับหน่วยงานรัฐและสมาคมวิชาชีพครูทั้งในและต่างประเทศ ทำให้นักศึกษาครูของมหาวิทยาลัยนครพนมมีศักยภาพโดดเด่น เพียบพร้อมด้วยทักษะในศตวรรษที่ 21 สามารถประยุกต์ใช้เครื่องมือเทคโนโลยีสมัยใหม่ในการพัฒนาความรู้ของตนเองและถ่ายทอดสู่ผู้เรียนได้อย่างมีประสิทธิภาพ",
        "dean-modal-p5": "ผมขอเชิญชวนทุกท่านมาร่วมกันเดินทางเพื่อบ่มเพาะปัญญาและสร้างสรรค์สิ่งดี ๆ ให้กับสังคม ร่วมเป็นส่วนหนึ่งของครอบครัวครุศาสตร์ มหาวิทยาลัยนครพนมแห่งนี้ ในการร่วมมือกันสร้างสรรค์ \"วันพรุ่งนี้ที่ดีกว่าเดิม\" ให้แก่ลูกหลานและแผ่นดินของเราต่อไปครับ",
        "dean-modal-sign": "ผู้ช่วยศาสตราจารย์ ดร.เกรียงไกร ผาสุตะ<br><span class=\"text-slate-500 dark:text-slate-400\">คณบดีคณะครุศาสตร์ มหาวิทยาลัยนครพนม</span>",
        "btn-close": "ปิดหน้าต่าง",
        "pm-dur-lbl": "ระยะเวลาการศึกษา",
        "pm-degree-lbl": "วุฒิการศึกษาที่ได้รับ",
        "pm-overview-lbl": "โครงสร้างและภาพรวมหลักสูตร",
        "pm-career-lbl": "แนวทางการประกอบอาชีพในอนาคต"
    },
    en: {
        "site-title": "Faculty of Education, Nakhon Phanom University | คณะครุศาสตร์ มหาวิทยาลัยนครพนม",
        "nav-brand-sig": "EduNPU",
        "nav-home": "SERVICES",
        "nav-about": "ABOUT",
        "nav-curriculum": "CURRICULUMS",
        "nav-admission": "ADMISSIONS",
        "nav-news": "NEWS",
        "nav-contact": "CONTACT",
        "hero-email": "edu@npu.ac.th",
        "hero-est-title": "YEARS",
        "hero-est-sub": "FOUNDED EXPERIENCE",
        "hero-right-desc": "\"We meticulously aim to produce premium teacher graduates with supreme professional capabilities, founded upon work-integrated practice and the cultivation of pedagogical ethics within the Mekong subregion.\"",
        "seal-tag1": "NPU CERTIFIED",
        "seal-tag2": "PROFESSIONAL EDUCATOR",
        "p1-title": "Undergraduate (B.Ed.)",
        "p1-sub": "9 Programs | 4-Year Bachelor of Education",
        "p2-title": "Master's Degree (M.Ed.)",
        "p2-sub": "3 Programs | Administration & Innovation",
        "p3-title": "Doctoral (Ph.D. / Ed.D.)",
        "p3-sub": "2 Programs | Advanced Educational Research",
        "help-title": "What do we support?",
        "help-desc": "The Faculty of Education, Nakhon Phanom University focuses on reinforcing modern learning structures and active pedagogy paradigms. We fully empower classrooms with smart digital resources, computing labs, transparent tuition calculator options, and regional networks to shape high-impact teachers in the Mekong subregion.",
        "stat-stud-tag": "ACTIVE STUDENTS",
        "stat-employ-tag": "EMPLOYMENT RATE",
        "dean-badge": "DEAN'S MESSAGE",
        "dean-header": "\"Developing Elite Teacher Graduates to Power Mekong Subregion Communities\"",
        "dean-excerpt": "\"We are extremely thrilled to welcome all academics and potential students to our online hub. The Faculty of Education represents a pivotal teacher nurturing base, actively pursuing educational reforms, developing teacher professionals of immense skill...\"",
        "dean-btn-read": "Read Full Message",
        "time-badge": "ACADEMIC JOURNEY",
        "time-title": "History of the Faculty",
        "time1-role": "Established by University Council Resolution",
        "time1-period": "October 1, 2015",
        "time1-body": "Established to streamline teacher education from the Faculty of Liberal Arts and Science, optimizing operational agility and targeting regional primary-secondary school needs.",
        "time2-role": "Expanded Graduate School (M.Ed. & Ph.D.)",
        "time2-period": "2018 - 2020",
        "time2-body": "Introduced specialized Master and Doctorate streams in Curriculum & Instruction and Educational Administration to foster institutional leaders.",
        "time3-role": "Moving Global & Digital Classroom Innovation",
        "time3-period": "2024 - Present",
        "time3-body": "Pioneering cross-border teacher preparation models in the Mekong basin, blending pedagogy with AI applications and digital courseware.",
        "curr-badge": "DEGREE FRAMEWORK",
        "curr-title": "Our Educational Framework",
        "tab-bachelor": "Undergraduate (B.Ed.)",
        "tab-master": "Master's (M.Ed.)",
        "tab-doctoral": "Doctoral (Ph.D. / Ed.D.)",
        "adm-badge": "ADMISSION SYSTEM",
        "adm-title": "Are You Ready to Join Us?",
        "adm-r1-title": "TCAS Round 1 Portfolio",
        "adm-r1-period": "Timeline: Nov - Jan",
        "adm-r1-body": "Evaluation of school performance, certificate portfolios, scientific projects, or extraordinary traits without written tests.",
        "adm-r2-title": "TCAS Round 2 Quota",
        "adm-r2-period": "Timeline: Feb - Apr",
        "adm-r2-body": "Localized quotas for students across 17 Northeastern provinces, regional teacher initiatives, and institutional networks.",
        "adm-r3-title": "TCAS Round 3 Admission",
        "adm-r3-period": "Timeline: May",
        "adm-r3-body": "National centralized allocation via MyTCAS. Employs core academic testing standards alongside the pedagogy exam (TPAT5).",
        "adm-r4-title": "TCAS Round 4 Direct",
        "adm-r4-period": "Timeline: Jun",
        "adm-r4-body": "Direct institutional recruitment. Suitable for applicants who haven't confirmed placements during earlier phases.",
        "calc-title": "Tuition Fee Cost Estimator Tool",
        "calc-subtitle": "Simulate and project your termly fees for the Faculty of Education to help outline financial frameworks.",
        "calc-label-lvl": "Choose Level of Education",
        "calc-label-prog": "Select Degree Specialization",
        "calc-label-sem": "Class / Semester Scheme Type",
        "lvl-opt-bachelor": "Bachelor's Degree (4-Yr Course)",
        "lvl-opt-master": "Master's Degree (2-Yr Course)",
        "lvl-opt-doctoral": "Doctoral Degree",
        "sem-opt-reg": "Regular Class Program (Regular Semester)",
        "sem-opt-spec": "Weekend Class Scheme (Special Semester)",
        "calc-out-header": "Projected Tuition Fee Per Term",
        "calc-notice": "*Estimated cost. Actual fees could vary based on official university announcements.",
        "calc-total-lbl": "Projected Course Total",
        "calc-sch-lbl": "Financial Aid Eligibility",
        "calc-sch-val": "Student Loans (กยศ.) / Talent Scholarships",
        "currency-baht": "THB",
        "news-badge": "MY LATEST WORKS",
        "news-title": "Latest News & Events",
        "tag-academic": "Academic",
        "tag-activity": "Activities",
        "news1-title": "Faculty of Education Hosts 9th National Conference on Mekong Learning Management Innovation",
        "news1-excerpt": "A vast symposium showcasing academic creations, learning designs, and class innovations to raise standards in regional schools...",
        "news2-title": "Pre-Pedagogy Integration Program Preparing Future Teacher Graduates for Digital Smart-Schooling",
        "news2-excerpt": "Focuses on instilling profound professional ethics, classroom engagement tactics, and modern digital AI tools to guide children...",
        "btn-news-read": "Read Details",
        "test-badge": "PEOPLE TALK ABOUT US",
        "test-title": "Echoes of Success",
        "t1-body": "\"Nurturing programs here are deeply grounded in real-life teaching clinics. The professors are exceptionally dedicated, and advanced smart classroom suites allow us to design highly engaging digital courses.\"",
        "t1-name": "Saranya Kondee",
        "t1-role": "Thai Language Graduate (Gen 7) | Current Government School Educator",
        "t2-body": "\"Pursuing a Doctorate in Curriculum & Instruction has broadened my educational perspectives in the Mekong region. The research review standard is rigorous, transparent, and highly empowering.\"",
        "t2-name": "Dr. Thawatchai Meechai",
        "t2-role": "Ph.D. Curriculum & Instruction Alumnus | Current Secondary School Principal",
        "con-badge": "CONTACT US",
        "con-title": "Reach Out to Our Campus",
        "con-info-hdr": "Office of the Dean, Faculty of Education",
        "con-lbl-addr": "Office Location",
        "con-val-addr": "167/1 Moo 8, Ban Noen Sa-at, Na Ratchakhwai Sub-district, Mueang District, Nakhon Phanom 48000",
        "con-lbl-phone": "Phone Line",
        "con-lbl-email": "Official Email",
        "con-lbl-social": "Social Communities",
        "form-hdr": "Quick Message Inbox",
        "form-name-lbl": "Your Full Name",
        "form-email-lbl": "Your Reply Email Address",
        "form-msg-lbl": "Your Inquiry Message Content",
        "form-btn-submit": "Send Inquiry Message",
        "btn-map-full": "View Fullscreen on Google Maps",
        "foot-cta": "Let's build a brighter educational future together.",
        "foot-cta-link": "Start by applying online now",
        "link-npu": "Nakhon Phanom University",
        "link-ksp": "Kuru Sapa",
        "link-mhesi": "MHESI",
        "link-tcas": "MyTCAS",
        "dean-modal-badge": "EXECUTIVE MESSAGE",
        "dean-modal-title": "Letter from Dean of Faculty of Education, NPU",
        "dean-modal-p1": "Dear Students, Faculty Members, Staff, and Visitors,",
        "dean-modal-p2": "On behalf of the Faculty of Education, Nakhon Phanom University, it is my utmost honor and pleasure to welcome you to our official online communication portal.",
        "dean-modal-p3": "Our Faculty was founded with a crucial directive: to raise national teaching excellence. Guided by our philosophy to develop 'Teachers possessing high intelligence coupled with absolute moral ethics and code of conduct', we believe in cultivating minds, as only outstanding teachers can shape smart communities.",
        "dean-modal-p4": "Today, we have fully integrated advanced structures, including smart classrooms, work-based educational workshops, and solid links with prestigious domestic and foreign academic bodies. This guarantees our graduates emerge with premium 21st-century capabilities and the ability to seamlessly employ AI and digital aids to maximize classroom learning.",
        "dean-modal-p5": "I warmly invite you to join us on this beautiful path of knowledge acquisition. Become a proud member of the NPU Faculty of Education family as we collaborate to create a 'Brighter Tomorrow' for our future generations.",
        "dean-modal-sign": "Asst. Prof. Dr. Kriangkrai Phasuta<br><span class=\"text-slate-500 dark:text-slate-400\">Dean of Faculty of Education, Nakhon Phanom University</span>",
        "btn-close": "Close Window",
        "pm-dur-lbl": "Duration of Studies",
        "pm-degree-lbl": "Degree Conferred",
        "pm-overview-lbl": "Course Overview & Focus",
        "pm-career-lbl": "Future Professional Careers"
    }
};

function switchLang(lang) {
    currentLang = lang;
    localStorage.setItem('lang', lang);
    
    // Update active dropdown UI text
    if (currentLangText) currentLangText.textContent = lang.toUpperCase();
    if (mobileLangBtn) mobileLangBtn.textContent = lang.toUpperCase();
    
    // Set html lang attribute
    document.documentElement.lang = lang;
    
    // Process translate elements
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(el => {
        const key = el.getAttribute('data-translate');
        const translation = langTranslations[lang][key];
        
        if (translation) {
            if (key === 'site-title') {
                document.title = translation;
            } else if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = translation;
            } else {
                el.innerHTML = translation;
            }
        }
    });

    const siteTitleEl = document.getElementById('site-title');
    if (siteTitleEl) {
        siteTitleEl.textContent = langTranslations[lang]['site-title'];
    }

    const copyEl = document.getElementById('footer-copy');
    if (copyEl) {
        copyEl.innerHTML = lang === 'th' ? 
            `&copy; 2026 คณะครุศาสตร์ มหาวิทยาลัยนครพนม. All rights reserved.` :
            `&copy; 2026 Faculty of Education, Nakhon Phanom University. All rights reserved.`;
    }
    
    // Re-populate and render components relying on language
    renderTabContent(activeTab);
    updateCalcPrograms();
}

// Window Onload Initialization
window.addEventListener('DOMContentLoaded', () => {
    // Determine language from localStorage or default
    const savedLang = localStorage.getItem('lang') || 'th';
    
    // Render curriculum content first
    renderTabContent('bachelor');
    
    // Set initial language
    switchLang(savedLang);
    
    // Setup initial calculator list
    updateCalcPrograms();
});
