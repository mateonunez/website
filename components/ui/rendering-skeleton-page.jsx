export default function RenderingPageSkeleton() {
  return (
    // Create a circular animation for a loading page
    <div className="flex items-center justify-center h-screen">
      <div className="w-32 h-32 border-b-2 border-gray-300 rounded-full animate-spin"></div>
    </div>
  );
}
