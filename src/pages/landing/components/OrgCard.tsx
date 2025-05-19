
interface OrgCardProps {
  name: string;
  title: string;
  image: string;
  borderColor?: string;
}

export const OrgCard = ({ name, title, image, borderColor = "border-blue-500" }: OrgCardProps) => {
  return (
    <div className="flex flex-col items-center space-y-2">
      <div
        className={`w-64 h-64 rounded-full overflow-hidden border-4 ${borderColor} flex items-center justify-center`}
      >
        <img
          src={image}
          alt={name}
          width={100}
          height={100}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="text-center">
        <div className="font-semibold text-sm">{name}</div>
        <div className="text-xs text-muted-foreground">{title}</div>
      </div>
    </div>
  );
};
