export function NameHeadingSkeleton() {
  return (
    <div className="text-center mb-8">
      <div className="h-14 md:h-16 lg:h-20 w-2/3 mx-auto skeleton rounded-md" />
      <div className="h-6 w-1/3 mx-auto mt-3 skeleton rounded-md" />
    </div>
  );
}
