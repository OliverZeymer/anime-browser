export default function getScoreColor(score) {
  const color = score >= 9 ? 'text-[#974EDD]' : score >= 8 ? 'text-[#22C55E]' : score >= 6.5 ? 'text-white' : score > 0 ? 'text-[#dc2626]' : 'text-white';
  return color;
};
