import formatString from "@/core/utils/formatStrings";
import Component from "@/core/components/Component";

export default function Category({ categoryName, categoryContent, groupName }) {
  return (
      <li>
          <details open>
              <summary>{formatString(categoryName)}</summary>
              <ul>
                  {categoryContent.map((component, index) => (
                      <Component
                          key={index}
                          component={component}
                          groupName={groupName}
                          categoryName={categoryName}
                      />
                  ))}
              </ul>
          </details>
      </li>
  );
}