<script setup lang="ts">
import { shallowRef } from 'vue'
import type { LngLat, YMap } from '@yandex/ymaps3-types'
import {
  YandexMap,
  YandexMapControls,
  YandexMapDefaultFeaturesLayer,
  YandexMapDefaultSchemeLayer,
  YandexMapMarker,
  YandexMapZoomControl,
} from 'vue-yandex-maps'

// Можно использовать для различных преобразований
const map = shallowRef<null | YMap>(null)
const INC_POINT = {
  coordinates: [68.72761897486866, 38.58264746993179] as LngLat,
}
</script>

<template>
  <YandexMap
    v-model="map"
    :settings="{
      location: {
        center: [68.72761897486866, 38.58264746993179],
        zoom: 18,
      },
      showScaleInCopyrights: true,
    }"
    width="100%"
    height="100%"
  >
    <YandexMapDefaultSchemeLayer />
    <YandexMapDefaultFeaturesLayer />
    <YandexMapControls :settings="{ position: 'right' }">
      <YandexMapZoomControl />
    </YandexMapControls>

    <YandexMapMarker :settings="{ coordinates: INC_POINT.coordinates }" position="top-center left-center">
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M26.6667 13.3333C26.6667 21.3333 16 29.3333 16 29.3333C16 29.3333 5.33334 21.3333 5.33334 13.3333C5.33334 10.5043 6.45714 7.79121 8.45753 5.79082C10.4579 3.79043 13.171 2.66663 16 2.66663C18.829 2.66663 21.5421 3.79043 23.5425 5.79082C25.5429 7.79121 26.6667 10.5043 26.6667 13.3333Z" fill="#BE0000" />
        <path d="M16 17.3334C18.2091 17.3334 20 15.5425 20 13.3334C20 11.1242 18.2091 9.33337 16 9.33337C13.7909 9.33337 12 11.1242 12 13.3334C12 15.5425 13.7909 17.3334 16 17.3334Z" fill="white" />
      </svg>
    </YandexMapMarker>
  </YandexMap>
</template>
