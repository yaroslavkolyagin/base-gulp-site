Базовая сборка проекта pug+less+js

Вновом проекте выполнить:
npm init
npm i --save-dev gulp browser-sync del gulp-concat gulp-rename gulp-pug gulp-less gulp-autoprefixer gulp-csso gulp-csscomb gulp-uglify gulp-svg-sprite
npm i --save normalize.less jquery
Перенести из этого репозитория папку app и файл gulpfile.js
Выполнить gulp develop. 


Примеры кода:

Добавление pug миксинов
+demoModule(['Пример текста 1'], ['Пример текста 2'])

Добавление адаптивных картинок для широкоформатных экранов
picture
    source(srcset="path/@3x.jpg" media="(min-width: 2561px)")
    source(srcset="path/@2x.jpg" media="(min-width: 1921px)")
    img(src="path/.jpg" alt="")
    
Добавление svg из спрайта
svg
	use(href="img/sprite.svg#icon-name")
