<template>
    <main>
        <router-view />
    </main>
</template>

<style lang="scss">
html,
body {
    width: 100%;
    height: 100%;
}

#app {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
}

main {
    max-width: 900px;
    width: 900px;
    height: 500px;
    max-height: 500px;
    padding: 2rem 3rem;
    border-radius: 2px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}
</style>
