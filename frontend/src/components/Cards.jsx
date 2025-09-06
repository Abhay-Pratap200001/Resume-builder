import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { Award, Clock, Edit, Trash2, TrendingUp, Zap } from "lucide-react";

// Profile Info Card
export const ProfileInfoCard = () => {
  const navigate = useNavigate();
  const { user, clearUser } = useContext(UserContext);

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/");
  };

  return (
    user && (
      <div className="flex items-center gap-3 bg-white shadow-md px-4 py-2 rounded-xl border border-gray-100">
        {/* Avatar */}
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center text-white font-bold text-lg">
          {user.name ? user.name.charAt(0).toUpperCase() : ""}
        </div>

        {/* User Info */}
        <div className="flex flex-col">
          <div className="text-sm font-semibold text-gray-800">
            {user.name || ""}
          </div>
          <button
            className="text-xs text-red-500 font-medium hover:underline"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    )
  );
};

// Resume Summary Card
export const ResumeSummaryCard = ({
  title = "Untitled Resume",
  createdAt = null,
  updatedAt = null,
  onSelect,
  onDelete,
  completion = 85,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const formattedCreatedDate = createdAt
    ? new Date(createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "--";

  const formattedUpdatedDate = updatedAt
    ? new Date(updatedAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "--";

  const getCompletionColor = () => {
    if (completion >= 90) return "from-green-400 to-green-600";
    if (completion >= 70) return "from-yellow-400 to-yellow-600";
    return "from-red-400 to-red-600";
  };

  const getCompletionIcon = () => {
    if (completion >= 90) return <Award size={14} className="text-green-600" />;
    if (completion >= 70) return <TrendingUp size={14} className="text-yellow-600" />;
    return <Zap size={14} className="text-red-600" />;
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    if (onDelete) onDelete();
  };

  const generateDesign = () => {
    const colors = [
      "from-blue-100 to-blue-50",
      "from-purple-100 to-purple-50",
      "from-emerald-100 to-emerald-50",
      "from-amber-100 to-amber-50",
      "from-rose-100 to-rose-50",
    ];
    return colors[title.length % colors.length];
  };

  const designColor = generateDesign();

  return (
    <div
      className="relative bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden cursor-pointer transition-all hover:shadow-xl hover:-translate-y-1"
      onClick={onSelect}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Completion Badge */}
      <div className="absolute top-3 right-3 flex items-center gap-1 bg-white shadow-sm px-3 py-1 rounded-full text-xs font-medium">
        {getCompletionIcon()}
        <span>{completion}%</span>
      </div>

      {/* Preview Section */}
      <div
        className={`relative h-44 bg-gradient-to-br ${designColor} flex flex-col items-center justify-center text-center`}
      >
        <div className="flex flex-col items-center">
          <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center mb-2 shadow-md">
            <Edit size={26} className="text-indigo-600" />
          </div>
          <span className="text-sm font-semibold text-gray-800">{title}</span>
          <span className="text-xs text-gray-500 mt-1">
            {completion === 0 ? "Start building" : `${completion}% completed`}
          </span>
        </div>

        {/* Sections Preview */}
        <div className="mt-4 flex gap-2 flex-wrap justify-center">
          {["Profile", "Work", "Skills", "Edu"].map((section, i) => (
            <div
              key={i}
              className={`px-2 py-0.5 text-xs rounded-lg transition ${
                i < Math.floor(completion / 25)
                  ? "bg-indigo-100 text-indigo-700 font-medium"
                  : "bg-gray-100 text-gray-400"
              }`}
            >
              {section}
            </div>
          ))}
        </div>
      </div>

      {/* Hover Overlay */}
      {isHovered && (
        <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px] flex items-center justify-center gap-5">
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (onSelect) onSelect();
            }}
            className="bg-indigo-600 text-white p-3 rounded-full shadow-lg hover:bg-indigo-700 transition"
            title="Edit"
          >
            <Edit size={18} />
          </button>
          <button
            onClick={handleDeleteClick}
            className="bg-red-600 text-white p-3 rounded-full shadow-lg hover:bg-red-700 transition"
            title="Delete"
          >
            <Trash2 size={18} />
          </button>
        </div>
      )}

      {/* Info Section */}
      <div className="p-4">
        <h5 className="text-sm font-semibold text-gray-800 truncate">{title}</h5>
        <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 mt-2">
          <span className="flex items-center gap-1">
            <Clock size={12} /> Created: {formattedCreatedDate}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={12} /> Updated: {formattedUpdatedDate}
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full bg-gradient-to-r ${getCompletionColor()} rounded-full transition-all duration-700 ease-in-out`}
          style={{ width: `${completion}%` }}
        />
      </div>

      {/* Footer Status */}
      <div className="flex justify-between items-center px-4 py-3 bg-gray-50 border-t">
        <span className="text-xs font-medium text-gray-500">
          {completion < 50
            ? "Getting Started"
            : completion < 80
            ? "Almost There"
            : "Ready to Go!"}
        </span>
        <span className="text-xs font-bold text-gray-700">{completion}%</span>
      </div>
    </div>
  );
};
