import formatString from "@/core/utils/formatStrings";
import Category from "@/core/components/Category";

export default function Group({ groupName, groupContent }) {
  return (
      <li>
          <h2>{formatString(groupName)}</h2>
          <ul>
              {Object.entries(groupContent).map(([categoryName, categoryContent], index) => (
                  <Category key={index}
                            categoryName={categoryName}
                            categoryContent={categoryContent}
                            groupName={groupName} />
              ))}
          </ul>
      </li>
  );
}