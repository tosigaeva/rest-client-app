export default function Page() {
  return (
    <>
      <div className="pt-20">
        {/* Длинный контент для прокрутки */}
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            className="flex h-screen items-center justify-center border-b border-gray-300 bg-gray-100"
            key={i}
          >
            <h2 className="text-2xl font-bold text-gray-700">Блок контента #{i + 1}</h2>
          </div>
        ))}
      </div>
    </>
  );
}
