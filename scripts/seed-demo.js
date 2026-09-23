// Builds a fake, deterministic dataset for the Digital Gradebook demo screenshots.
//
// The gradebook is a Claude Artifact (single static page, no backend) that keeps
// all of its state in localStorage under STORE_KEY, matching the shape produced
// by `defaultState()` in the artifact's own source. This module builds that same
// shape with realistic-but-fictional data so screenshot-demo.js can inject it via
// `localStorage.setItem(STORE_KEY, JSON.stringify(buildDemoState()))` before
// loading each screen — no student in here is a real person, and nothing here
// ever touches the teacher's live synced copy.
//
// Deterministic (seeded PRNG, no Date.now/Math.random) so reruns produce byte-identical
// state and never "duplicate" anything — there's nothing to duplicate, it's a full replace.

export const STORE_KEY = 'bimester_gradebook_v1';

const SKILLS = ['GR', 'RD', 'LT', 'SP', 'WT'];

// Small seeded PRNG (mulberry32) so the same fake dataset comes out every run.
function makeRng(seed) {
  let a = seed >>> 0;
  return function rng() {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const FIRST_NAMES = [
  'Mateo', 'Regina', 'Santiago', 'Ximena', 'Emiliano', 'Valentina', 'Diego',
  'Fernanda', 'Leonardo', 'Camila', 'Sebastian', 'Renata', 'Rodrigo', 'Paulina',
  'Andres', 'Daniela', 'Gael', 'Michelle', 'Ivan', 'Sofia', 'Alexis', 'Natalia',
  'Bruno', 'Ariadna',
];
const LAST_NAMES = [
  'Sanchez', 'Torres', 'Mendoza', 'Reyes', 'Cordova', 'Aguilar', 'Ramirez',
  'Delgado', 'Castillo', 'Vargas', 'Ontiveros', 'Salazar', 'Nava', 'Rocha',
  'Cabrera', 'Miranda', 'Pineda', 'Guerrero', 'Escobedo', 'Solis', 'Zavala',
  'Villalobos', 'Barajas', 'Cervantes',
];

function round1(n) {
  return Math.round(n * 10) / 10;
}

// A score centered on `base` with some seeded noise, clamped to the 0-10 grade range.
function score(rng, base, spread) {
  const v = base + (rng() - 0.5) * 2 * spread;
  return round1(Math.max(0, Math.min(10, v)));
}

export function buildDemoState() {
  const rng = makeRng(20260924);

  const students = FIRST_NAMES.map((first, i) => ({
    id: `st_demo_${i}`,
    no: i + 1,
    name: `${first} ${LAST_NAMES[i]}`,
  }));

  // Give each student a hidden "ability" score so grades correlate across
  // categories (a strong student is strong everywhere, a struggling one shows
  // up as an anomaly in more than one place) instead of looking like noise.
  const ability = students.map((_, i) => {
    if (i === 0) return 9.4; // clear top-of-class
    if (i === students.length - 1) return 4.3; // clearly at-risk
    if (i === students.length - 2) return 5.1; // borderline / watch
    return 6.5 + rng() * 2.6;
  });

  const bimIdx = 0; // all seeded work lives in the 1st Bimester (Aug-Oct)

  // ---- attendance (Aug, Sep, Oct) ----
  const attendance = {};
  const monthDays = { Aug: 18, Sep: 21, Oct: 20 };
  Object.entries(monthDays).forEach(([mk, schoolDays]) => {
    const marks = {};
    students.forEach((s, i) => {
      const dayMarks = {};
      const absenceChance = ability[i] < 6 ? 0.14 : 0.04;
      for (let day = 1; day <= schoolDays; day++) {
        const r = rng();
        if (r < absenceChance * 0.4) dayMarks[day] = 'A';
        else if (r < absenceChance) dayMarks[day] = 'D';
        else dayMarks[day] = 'P';
      }
      marks[s.id] = dayMarks;
    });
    attendance[mk] = { schoolDays, auto: true, marks };
  });

  // ---- homework / notebook / participation banks ----
  const bankColumns = {
    homework: ['Workbook Unit 1', 'Workbook Unit 2', 'Reading Log', 'Vocabulary Quiz'],
    notebook: ['Notebook Check 1', 'Notebook Check 2'],
    participation: ['Weeks 1-4', 'Weeks 5-8', 'Weeks 9-12'],
  };
  function buildBank(key) {
    const columns = bankColumns[key].map((name, i) => ({ id: `col_${key}_${i}`, name }));
    const scores = {};
    students.forEach((s, i) => {
      const row = {};
      columns.forEach((c) => {
        row[c.id] = score(rng, ability[i], 1.1);
      });
      scores[s.id] = row;
    });
    return { columns, scores };
  }

  // ---- exams (one score per skill) ----
  const exam = {};
  students.forEach((s, i) => {
    const row = {};
    SKILLS.forEach((sk) => {
      row[sk] = score(rng, ability[i] - 0.3, 1.3);
    });
    exam[s.id] = row;
  });

  // ---- a few teacher notes, to show that feature isn't empty ----
  const notes = { homework: {}, notebook: {}, participation: {}, exam: {} };
  notes.participation[students[0].id] = 'Always the first to volunteer — great model for the rest of the class.';
  notes.homework[students[students.length - 1].id] = 'Missing two workbook units. Following up with parents this week.';
  notes.exam[students[students.length - 2].id] = 'Understands the material in class but grades don’t reflect it yet — check for test anxiety.';

  const bim = [0, 1, 2, 3, 4].map((i) => {
    if (i !== bimIdx) {
      return {
        homework: { columns: [], scores: {} },
        notebook: { columns: [], scores: {} },
        participation: { columns: [], scores: {} },
        exam: {},
        notes: { homework: {}, notebook: {}, participation: {}, exam: {} },
      };
    }
    return {
      homework: buildBank('homework'),
      notebook: buildBank('notebook'),
      participation: buildBank('participation'),
      exam,
      notes,
    };
  });

  return {
    meta: {
      school: 'Colegio Bosque Verde',
      cct: '11XDM0042Z',
      level: '2nd Grade',
      section: 'MIDDLE SCHOOL',
      shift: 'MORNING',
      cycle: '2026-2027',
      teacher: 'Prof. Ana Delgado',
      group: 'B',
      weights: { att: 0.1, part: 0.1, hw: 0.2, nb: 0.3, exam: 0.3 },
      passing: 6,
      attRisk: 85,
      delaysPerAbsence: 3,
      outlierGap: 2,
    },
    students,
    nextNo: students.length + 1,
    attendance,
    bim,
    ui: { view: 0, selectedStudent: null },
  };
}
