import formatString from "@/core/utils/formatStrings";
import Variation from "@/core/components/Variation";

export default function Component({ component, groupName, categoryName }) {
  return (
      <li>
          <details>
              <summary>
                  {formatString(component.component)}
                  {component.version !== "1.0.0" && <small>(v{component.version})</small>}
              </summary>
              <ul>
                  {component.variations.map((variation, index) => (
                      <Variation
                          key={index}
                          variation={variation}
                          groupName={groupName}
                          categoryName={categoryName}
                          componentName={component.component}
                      />
                  ))}
              </ul>
          </details>
      </li>
  );
}