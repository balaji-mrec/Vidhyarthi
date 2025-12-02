export default function SearchBox() {
  return (
    <div className="bg-blue-100 text-center p-6 rounded-lg m-4">
      <h2 className="text-2xl font-bold text-blue-900 mb-4">🔍 Find What You're Looking For</h2>
      <input
        type="text"
        placeholder="Search for CSE, Pharmacy, Cutoff, ECE..."
        className="w-full md:w-2/3 p-3 rounded-full border outline-none"
      />
    </div>
  );
}
