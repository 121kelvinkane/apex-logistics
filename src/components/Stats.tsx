export default function Stats() {
  const stats = [
    { number: "800+", label: "Global Locations" },
    { number: "120+", label: "Countries Served" },
    { number: "10+", label: "Years of Experience" }
  ];
  return (
    <section className="bg-[#00234B] py-16 mt-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-gray-700">
          {stats.map((stat, index) => (
            <div key={index} className="pt-8 md:pt-0 px-4">
              <div className="text-4xl md:text-5xl font-extrabold text-[#FF8C00] mb-2">{stat.number}</div>
              <div className="text-gray-300 font-medium text-lg">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}