---
title: "Navigation Rotating"
type: "pat"
assets: { main-js: "NavigationRotating.pat.js", main-css: "navigation-rotating.pat.css" }
---

<div class="pat-navigation-rotating__base" data-js-pat="NavigationRotating">
  <div class="pat-navigation-rotating__container js-nav-rotating-container">
    <div class="pat-navigation-rotating__circle-container">
      <div class="pat-navigation-rotating__circle">
        <button class="pat-navigation-rotating__close-button js-nav-rotating-btn-close">
          <img class="fa-times" src="/svgs/fa-times.svg"/>
        </button>
        <button class="pat-navigation-rotating__open-button js-nav-rotating-btn-open">
          <img class="fa-bars" src="/svgs/fa-bars.svg"/>
        </button>
      </div>
    </div>
    <div class="pat-navigation-rotating__content">
      <h2 class="cmp-heading__base cmp-heading__base--heading-200">Amazing Article</h2>
      <p class="cmp-paragraph__base">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium quia in ratione dolores cupiditate,
        maxime aliquid impedit dolorem nam dolor omnis atque fuga labore modi veritatis porro laborum minus, illo,
        maiores recusandae cumque ipsa quos. Tenetur, consequuntur mollitia labore pariatur sunt quia harum aut.
        Eum maxime dolorem provident natus veritatis molestiae cumque quod voluptates ab non, tempore cupiditate?
        Voluptatem, molestias culpa. Corrupti, laudantium iure aliquam rerum sint nam quas dolor dignissimos in
        error placeat quae temporibus minus optio eum soluta cupiditate! Cupiditate saepe voluptates laudantium.
        Ducimus consequuntur perferendis consequatur nobis exercitationem molestias fugiat commodi omnis.
        Asperiores quia tenetur nemo ipsa.
      </p>
      <h3 class="cmp-heading__base cmp-heading__base--heading-300">My Dog</h3>
      <img
        class="cmp-image__base"
        loading="lazy"
        srcset="
          /images/doggy-480px.webp   480w,
          /images/doggy-960px.webp   960w,
          /images/doggy-1440px.webp 1440w
        "
        sizes="(max-width: 479px) 480px,
              (max-width: 959px) 960px,
              1440px"
        src="/images/doggy-original.webp"
        alt="doggy"
      />
      <p class="cmp-paragraph__base">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sit libero deleniti rerum quo, incidunt vel
        consequatur culpa ullam. Magnam facere earum unde harum. Ea culpa veritatis magnam at aliquid. Perferendis
        totam placeat molestias illo laudantium? Minus id minima doloribus dolorum fugit deserunt qui vero
        voluptas, ut quia cum amet temporibus veniam ad ea ab perspiciatis, enim accusamus asperiores explicabo
        provident. Voluptates sint, neque fuga cum illum, tempore autem maxime similique laborum odio, magnam
        esse. Aperiam?
      </p>
    </div>
  </div>

  <nav class="pat-navigation-rotating__navigation">
    <ul class="cmp-list-unordered__base">
      <li class="cmp-list-unordered__item pat-navigation-rotating__navigation-item">
        <i class="fas fa-home"></i><a class="cmp-link__base" href="#"> Home</a>
      </li>
      <li class="cmp-list-unordered__item pat-navigation-rotating__navigation-item">
        <i class="fas fa-user-alt"></i><a class="cmp-link__base" href="#"> About</a>
      </li>
      <li class="cmp-list-unordered__item pat-navigation-rotating__navigation-item">
        <i class="fas fa-envelope"></i><a class="cmp-link__base" href="#"> Contact</a>
      </li>
    </ul>
  </nav>
</div>
