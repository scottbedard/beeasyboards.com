<style lang="scss" scoped>@import 'core';
    div {
        position: relative;
    }

    span {
        $arrow-size: 10px;
        border-color: #ccc;
        border-style: solid;
        border-width: 0 2px 2px 0;
        display: block;
        height: $arrow-size;
        pointer-events: none;
        position: absolute;
        right: 12px;
        top: 50%;
        transform: translateY(-75%) rotate(45deg);
        width: $arrow-size;
    }

    select {
        appearance: none; // hide the default dropdown in most browsers
        background-color: transparent;
        border-radius: 3px;
        border: 1px solid #ccc;
        cursor: pointer;
        padding: 8px;
        text-indent: 1px;
        text-overflow: '';
        width: 100%;

        &::-ms-expand { display: none } // hide the default dropdown arrow in IE
    }
</style>

<template>
    <div>
        <select>
            <slot></slot>
        </select>
        <span></span>
    </div>
</template>
