export const COURSE_OPTIONS = [
  // B.Tech
  "B.Tech-CSE",
  "B.Tech-AIML",
  "B.Tech-AIDS",
  "B.Tech-Robotics&AI",
  "B.Tech-Cyber",
  "B.Tech-DS",
  "B.Tech-Blockchain",
  "B.Tech-IoT",
  "B.Tech-ECE",
  "B.Tech-ETE",
  "B.Tech-CE",
  "B.Tech-ME",
  "B.Tech-EE",

  // B.Sc
  "B.Sc-Forensic",
  "B.Sc-MLS",
  "B.Sc-ND",
  "B.Sc-RIT",
  "B.Sc-AOT",
  "B.Sc-Biotech",
  "B.Sc-Optometry",
  "B.Sc-Multimedia",
  "B.Sc-GWD",
  "B.Sc-FD",
  "B.Sc-Cyber",
  "B.Sc-IT",

  // Other UG
  "BCA",
  "BBA",
  "B.Com",
  "BA-JMC",
  "BA-LLB",
  "B.Com-LLB",
  "LLB",
  "B.Pharm",
  "D.Pharm",

  // PG Courses
  "M.Tech-CSE",
  "M.Tech-ECE",
  "M.Tech-ME",
  "M.Tech-CE",
  "M.Tech-EE",
  "MBA",
  "MCA",
  "M.Sc-CS",
  "M.Sc-IT",
  "M.Com"
];

const temp = COURSE_OPTIONS.map(item => item.split("-")[0]);

COURSE_OPTIONS.forEach(item => {
  if (!item.includes("-")) {
    temp.push(item);
  }
})

export const COURSES = [...new Set(temp)];

export const BRANCHES = (course) => {
  return COURSE_OPTIONS
    .filter(item => item.startsWith(course) && item.includes("-"))
    .map(item => item.split("-")[1])
    .filter(Boolean); // Filter out any empty branches
}

export const DEPARTMENTS = [
  'Computer Applications',
  'Engineering',
  'Management',
  'Commerce',
  'Law',
  'Pharmacy',
  'Administration',
  'Fashion Designing',
];
