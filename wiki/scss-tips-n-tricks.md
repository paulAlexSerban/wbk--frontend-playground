# Sass Tips n Tricks AND Troubleshooting

## Dart-sass compiling error: Undefined function. math.div

### Solution

```scss
@if meta.function-exists("div", "math") {
  @return math.div(20, 16px) * 1rem;
} @else {
  @return ($px / 16px) * 1rem;
}
```
