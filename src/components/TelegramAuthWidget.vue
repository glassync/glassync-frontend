<template>
  <div ref="telegramAuthWidgetContainer"></div>
</template>

<script>
import {
  defineComponent,
  onBeforeUnmount,
  onMounted,
  onUnmounted,
  ref,
} from "vue";

export default defineComponent({
  name: "TelegramLoginWidget",
  props: {
    botUsername: {
      type: String,
      required: true,
    },
    urlCallback: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    /**
     * Ссылка на контейнер telegram виджета.
     * @type {Ref<UnwrapRef<null>, UnwrapRef<null> | null>}
     */
    const telegramAuthWidgetContainer = ref(null);

    /**
     * Cлучайное имя глобальной функции для telegram виджета.
     * @type {string}
     */
    const telegramHandlerFunctionName = `handleTelegramAuth_${Math.floor(
      Math.random() * 10000
    )}`;

    /**
     * Ссылка на скрипт официального telegram виджета.
     * @type {string}
     */
    const telegramLoginWidgetUrl =
      "https://telegram.org/js/telegram-widget.js?22";

    /**
     * Функция обработчик успешной авторизации в telegram.
     */
    async function handleTelegramAuth() {
      const user = arguments[0];
      console.log("Telegram user data:", user);
      debugger;
      const success = await sendUserData(user);
      if (success) {
        alert(`Привет, ${user.first_name}! Вы успешно вошли через Telegram.`);
      }
    }

    /**
     * Функция отправляет информацию о пользователе на удалённый сервер
     * @param user
     */
    async function sendUserData(user) {
      debugger;
      const response = await fetch(props.urlCallback, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      return response.ok;
    }

    /**
     * Создаёт HTMLScript элемент, который создаёт виджет авторизации telegram.
     * @returns {HTMLScriptElement}
     */
    function getTelegramWidgetScript() {
      const script = document.createElement("script");

      script.src = telegramLoginWidgetUrl;
      script.async = true;

      script.setAttribute("data-telegram-login", props.botUsername);
      script.setAttribute("data-size", "large");
      script.setAttribute("data-userpic", "false");
      script.setAttribute("data-request-access", "write");
      script.setAttribute(
        "data-onauth",
        `${telegramHandlerFunctionName}( arguments[0] )`
      );

      return script;
    }

    /**
     * Загружает widget авторизации telegram в блок div.
     */
    function loadTelegramWidget() {
      if (telegramAuthWidgetContainer.value) {
        telegramAuthWidgetContainer.value.innerHTML = "";
        telegramAuthWidgetContainer.value.appendChild(
          getTelegramWidgetScript()
        );
      }
    }

    onMounted(() => {
      // Добавление глобальной функции обработки успешной авторизации пользователя в telegram
      window[telegramHandlerFunctionName] = handleTelegramAuth;
      // Загрузка виджета обработки telegram.
      loadTelegramWidget();
    });

    onBeforeUnmount(() => {
      // Удаление старой функции обработки успешной авторизации пользователя в telegram
      delete window[telegramHandlerFunctionName];
    });

    onUnmounted(() => {
      // Удаление старой функции обработки успешной авторизации пользователя в telegram
      delete window[telegramHandlerFunctionName];
    });

    return {
      telegramAuthWidgetContainer,
    };
  },
});
</script>
