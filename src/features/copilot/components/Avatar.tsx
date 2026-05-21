type AvatarProps = {
  isUser: boolean;
  src?: string;
};

export const Avatar = ({ isUser, src }: AvatarProps) => {
  if (src) {
    return (
      <img
        src={src}
        alt="avatar"
        className="w-8 h-8 rounded-full object-cover"
      />
    );
  }

  return (
    <div
      className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium
        ${isUser ? "bg-gray-700 text-white" : "bg-gray-700 text-white"}`}
    >
      {isUser ? "U" : "AI"}
    </div>
  );
};
