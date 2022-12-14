import BookmarkDisplay from "../components/BookmarkDisplay";

export default function BookmarkPage() {
  return (
    <div className="flex flex-col items-center text-lg text-primary mt-24">
      <div className="bg-[#EFEFEF] w-full p-8 pb-20 rounded-3xl mt-8">
        <div className="flow-root">
          <div className="float-left ml-32 mt-10">
            <h1>Bookmark</h1>
          </div>
        </div>
        <BookmarkDisplay placeUrl={`/bookmark`} />
      </div>
    </div>
  );
}
