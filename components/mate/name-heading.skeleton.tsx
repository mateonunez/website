export function NameHeadingSkeleton() {
  return (
    <div className="text-center">
      <div className="relative mt-4 sm:mt-6 md:mt-8 lg:mt-10">
        <div className="h-20 sm:h-24 md:h-28 lg:h-32 w-2/3 mx-auto skeleton rounded-md" />
      </div>
      <div className="h-6 sm:h-7 md:h-8 lg:h-10 w-1/3 mx-auto mt-2 sm:mt-3 md:mt-4 lg:mt-5 skeleton rounded-md" />
      <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 h-1 w-24 rounded-full skeleton opacity-70" />
    </div>
  );
}
