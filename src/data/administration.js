// Administrative roles from "Administrative Experience" document.
// `group` must match one of ADMIN_GROUPS. `periods` is free text, one per term;
// write "Present" in a period to mark the role as current.
export const ADMIN_GROUPS = ['Leadership', 'Department Head', 'Committees', 'Editorial', 'Projects', 'Campus Life'];

const BRUR = 'Begum Rokeya University, Rangpur';
const WRI = 'Dr. Wazed Research Institute, Begum Rokeya University, Rangpur';

export const administration = [
  // Leadership
  { group: 'Leadership', role: 'Dean, Faculty of Social Sciences', org: BRUR, periods: ['Jun 2023 \u2013 Jun 2025', 'Nov 2010 \u2013 Oct 2012'], note: '' },
  { group: 'Leadership', role: 'Controller of Examinations (In-charge)', org: BRUR, periods: ['Aug 2017 \u2013 Jan 2021', 'May 2014 \u2013 Mar 2015'], note: '' },
  { group: 'Leadership', role: 'Provost, Bangabandhu Sheikh Mujibur Rahman Hall', org: BRUR, periods: ['Aug 2014 \u2013 Mar 2015'], note: '' },
  { group: 'Leadership', role: 'Director (Hon), Central Library and Information Center', org: BRUR, periods: ['Dec 2012 \u2013 May 2014'], note: '' },
  { group: 'Leadership', role: 'Syndicate Member', org: BRUR, periods: ['Jan 2012 \u2013 Oct 2012'], note: '' },
  { group: 'Leadership', role: 'Proctor', org: BRUR, periods: ['Jan 2010 \u2013 Jul 2012'], note: '' },

  // Department headships
  { group: 'Department Head', role: 'Head, Department of Economics', org: BRUR, periods: ['Apr 2023 \u2013 Apr 2026', 'Dec 2016 \u2013 Dec 2019', 'Nov 2009 \u2013 Nov 2012'], note: '' },
  { group: 'Department Head', role: 'Head, Department of Public Administration', org: BRUR, periods: ['Dec 2012 \u2013 Mar 2015'], note: '' },
  { group: 'Department Head', role: 'Head, Department of Women and Gender Studies', org: BRUR, periods: ['Jan 2012 \u2013 Mar 2015'], note: '' },
  { group: 'Department Head', role: 'Head, Department of Mass Communication and Journalism', org: BRUR, periods: ['Jan 2012 \u2013 Mar 2015'], note: '' },
  { group: 'Department Head', role: 'Head, Department of Political Science', org: BRUR, periods: ['Jan 2012 \u2013 Mar 2015'], note: '' },
  { group: 'Department Head', role: 'Head, Department of Sociology', org: BRUR, periods: ['Jan 2011 \u2013 Jan 2014'], note: '' },

  // Councils and committees
  { group: 'Committees', role: 'Member, Academic Council', org: BRUR, periods: ['Aug 2009 \u2013 Present'], note: '' },
  { group: 'Committees', role: 'Member, Standing Committee', org: BRUR, periods: [], note: '' },
  { group: 'Committees', role: 'Member, Advanced Education Committee', org: BRUR, periods: [], note: '' },
  { group: 'Committees', role: 'Member, Advisory Board', org: WRI, periods: [], note: '' },
  { group: 'Committees', role: 'Member, Board of Studies', org: WRI, periods: [], note: '' },
  { group: 'Committees', role: 'Member, Academic Committee', org: WRI, periods: [], note: '' },
  { group: 'Committees', role: 'Chairman / Member, Examination Committee (MSS, BSS)', org: `Department of Economics, ${BRUR}`, periods: [], note: '' },
  { group: 'Committees', role: 'Coordinator, B Unit (Faculty of Social Sciences)', org: BRUR, periods: ['1st Year Hon\u2019s Admission Test 2012\u20132013'], note: '' },
  { group: 'Committees', role: 'Coordinator, A Unit (Faculty of Arts and Social Sciences)', org: BRUR, periods: ['1st Year Hon\u2019s Admission Test 2011\u20132012'], note: '' },

  // Editorial
  { group: 'Editorial', role: 'Editor, Journal of Social Science', org: `Faculty of Social Sciences, ${BRUR}`, periods: ['Vol 8 No 1, Jun 2025', 'Vol 7 No 1, Jul 2024', 'Vol 1 No 1, Sep 2012'], note: 'ISSN 2305-1035' },
  { group: 'Editorial', role: 'Associate Editor, Journal of Social Science', org: `Faculty of Social Sciences, ${BRUR}`, periods: ['Vol 3 & 4, Dec 2015', 'Vol 2 No 1, Dec 2013'], note: 'ISSN 2305-1035' },
  { group: 'Editorial', role: 'Editor, Journal of Economics', org: `Department of Economics, ${BRUR}`, periods: ['Vol 2 & 3, Nov 2019', 'Vol 1 No 1, Nov 2017'], note: 'ISSN 2617-023X' },
  { group: 'Editorial', role: 'Associate Editor, Indiana Journal of Humanities and Social Sciences', org: 'Indiana Publications, India', periods: [], note: 'Editorial Membership ID IJ-IJHSS-2020-0' },
  { group: 'Editorial', role: 'Member, Editorial Board, Bangladesh Journal of Political Economy', org: 'Bangladesh Economic Association', periods: [], note: 'ISSN 2227-3182' },
  { group: 'Editorial', role: 'Member, Editorial Team, American Journal of Economics and Business Innovation (AJEBI)', org: 'journal.e-palli.com', periods: [], note: '' },

  // Projects, networks and national service
  { group: 'Projects', role: 'Team Member, Action Research on Community Dialogue Facilitation Tools for Women Empowerment', org: 'Ministry of Women and Children Affairs \u00b7 MDG Achievement Fund, United Nations', periods: ['Jan 2013 \u2013 Present'], note: 'Promotion of Gender Equality and Women Empowerment Project' },
  { group: 'Projects', role: 'Sub-Project Manager, HEQEP (CP-24)', org: `Department of Economics, ${BRUR} \u00b7 UGC, funded by the World Bank`, periods: ['Jan 2011 \u2013 Dec 2012'], note: 'Higher Education Quality Enhancement Project' },
  { group: 'Projects', role: 'Curriculum Specialist', org: 'National Curriculum and Textbook Board (NCTB), Dhaka', periods: ['Jan 2004 \u2013 Nov 2005'], note: '' },
  { group: 'Projects', role: 'Focal Point, Child Rights Issues', org: 'Save the Children, Sweden-Denmark', periods: [], note: '' },
  { group: 'Projects', role: 'Focal Point', org: 'South Asia Network of Economic Research Institutes (SANEI)', periods: [], note: '' },

  // Campus life
  { group: 'Campus Life', role: 'Member, Sports Development Committee', org: BRUR, periods: ['May 2011 \u2013 Mar 2015'], note: '' },
  { group: 'Campus Life', role: 'Treasurer, Rover Scout Unit', org: BRUR, periods: ['Mar 2010 \u2013 Mar 2015'], note: '' },
  { group: 'Campus Life', role: 'Advisor, Begum Rokeya University Debating Society (BRUDS)', org: BRUR, periods: ['Mar 2010 \u2013 Mar 2015'], note: '' },
];