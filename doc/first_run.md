Установите node package manager и yarn (для удачного запуска 
версия не должна превышать указанную в проекте, 
см. версию в readme)

`sudo apt install npm && apt install yarn`
Первый запуск (Смена режима в файле .env dev/test/prod)

    yarn
Режим разработки в live режиме

     yarn dev  

Проход тестов

     yarn test  

Компиляция финальной версии в папку dist

     yarn build  
