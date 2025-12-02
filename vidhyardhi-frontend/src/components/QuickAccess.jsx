export default function QuickAccess() {
  return (
    <div className="bg-blue-100 p-6 m-4 rounded-lg">
      <h3 className="text-xl font-bold text-center text-blue-900 mb-4">🎓 EAPCET Quick Access</h3>
      <div className="flex flex-wrap gap-4 justify-center">
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">🎯 Counselling Support</button>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">📊 College Predictor</button>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">✅ CUT OFF'S RESOURCES</button>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">🏆 College Filter & CODES</button>
      </div>
    </div>
  );
}
