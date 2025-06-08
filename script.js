const questions = [
  { q: "人と過ごすと元気が出る", type: "E" },
  { q: "一人の時間が落ち着く", type: "I" },
  { q: "五感で物事を感じる方だ", type: "S" },
  { q: "直感やひらめきを信じる", type: "N" },
  { q: "論理的に判断することが多い", type: "T" },
  { q: "感情や人間関係を大切にする", type: "F" },
  { q: "計画的に動くのが好き", type: "J" },
  { q: "柔軟に対応したいタイプ", type: "P" }
];

let answers = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
let current = 0;

const mbtiDescriptions = {
  INTP: { name: "論理学者", desc: "独創的で分析力に優れた思考型の人物です。" },
  INTJ: { name: "建築家", desc: "戦略的で計画的。未来志向な完璧主義者。" },
  INFP: { name: "仲介者", desc: "理想主義的で人を思いやる感受性豊かな人。" },
  INFJ: { name: "提唱者", desc: "洞察力と直感に優れ、他者を導くリーダー。" },
  ISTJ: { name: "管理者", desc: "責任感が強く、忠実で組織を支えるタイプ。" },
  ISFJ: { name: "擁護者", desc: "思いやり深く、支援と献身を惜しまない。" },
  ISTP: { name: "巨匠", desc: "柔軟で現実的、手を動かして学ぶタイプ。" },
  ISFP: { name: "冒険家", desc: "芸術的感性と自由を愛する温和な人。" },
  ENTP: { name: "討論者", desc: "知的好奇心旺盛で、議論好きな挑戦者。" },
  ENFP: { name: "運動家", desc: "社交的で創造的、エネルギッシュな自由人。" },
  ENTJ: { name: "指揮官", desc: "意志が強く、目標に向かって突き進むリーダー。" },
  ENFJ: { name: "主人公", desc: "他人を導き、影響を与える情熱的な人。" },
  ESTJ: { name: "幹部", desc: "ルールを重んじ、管理能力に長ける。" },
  ESFJ: { name: "領事官", desc: "協調性があり、思いやりにあふれた人。" },
  ESTP: { name: "起業家", desc: "冒険心があり、即断即決型の行動派。" },
  ESFP: { name: "エンターテイナー", desc: "人を楽しませる社交的なムードメーカー。" }
};

function showQuestion() {
  const q = questions[current];
  const quiz = document.getElementById("quiz");
  quiz.innerHTML = `
    <h2>質問 ${current + 1} / ${questions.length}</h2>
    <p>${q.q}</p>
    <button onclick="answer('${q.type}')">はい</button>
    <button onclick="answer('${opposite(q.type)}')">いいえ</button>
  `;
}

function answer(type) {
  answers[type]++;
  current++;
  if (current < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

function opposite(type) {
  const pairs = { E: "I", I: "E", S: "N", N: "S", T: "F", F: "T", J: "P", P: "J" };
  return pairs[type];
}

function showResult() {
  const result = [
    answers.E >= answers.I ? "E" : "I",
    answers.S >= answers.N ? "S" : "N",
    answers.T >= answers.F ? "T" : "F",
    answers.J >= answers.P ? "J" : "P"
  ].join("");

  const { name, desc } = mbtiDescriptions[result] || { name: "未知", desc: "該当タイプが見つかりませんでした。" };
  document.getElementById("quiz").style.display = "none";
  document.getElementById("result").style.display = "block";
  document.getElementById("mbti-type").textContent = `あなたのMBTIタイプは ${result} です。`;
  document.getElementById("mbti-name").textContent = `（${name}）`;
  document.getElementById("mbti-description").textContent = desc;
}

function restartQuiz() {
  current = 0;
  answers = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
  document.getElementById("result").style.display = "none";
  document.getElementById("quiz").style.display = "block";
  showQuestion();
}

window.onload = showQuestion;
