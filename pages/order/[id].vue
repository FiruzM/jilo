<script setup>

</script>

<template>
  <div class="mx-auto flex max-w-[1360px] flex-col gap-10 pb-16 pt-[100px]">
    <h3 class="text-3xl font-semibold">
      Заказ №0001
    </h3>

    <span class="self-start rounded-xl bg-[#DFF0D8] px-7 py-4 text-[#3C763D]">Заказ успешно оформлен</span>

    <div>
      <h3 class="text-2xl font-semibold">
        Информация о заказе
      </h3>
      <div class="flex gap-6 pb-5 pt-8">
        <div class="flex flex-col gap-8">
          <p>Дата оформления</p>
          <p>Сумма и статус оплаты</p>
          <p>Способ оплаты</p>
          <p>Способ доставки</p>
          <p>Адрес доставки</p>
          <p>Получатель</p>
          <p>Номер телефона</p>
        </div>

        <div class="flex flex-col gap-8">
          <p class="font-semibold">
            Информация о заказе
          </p>
          <p class="gap-4 font-semibold">
            108.00 сомони
            <span class="ml-4 rounded-xl border border-[#F0E8D8] px-3 py-1 text-sm text-[#765F3C]">В ожидании</span>
            <span class="ml-4 rounded-xl bg-primary px-6 py-3">Перейти к оплате</span>
          </p>
          <p class="font-semibold">
            Оплата картой онлайн
          </p>
          <p class="font-semibold">
            Доставка по адресу
          </p>
          <p class="font-semibold">
            г. Душанбе, пр-т Рудаки, 34
          </p>
          <p class="font-semibold">
            Фарида Рустамова
          </p>
          <p class="font-semibold">
            +992 900 98 76 54
          </p>
        </div>
      </div>
    </div>

    <h3 class="text-3xl font-semibold">
      Состав заказа
    </h3>

    <div class="overflow-hidden rounded-xl border border-[#D5D5D5]">
      <Table class="">
        <TableHeader class="bg-[#F0F0F0]">
          <TableRow class="border-[#D5D5D5]">
            <TableHead class="text-[#868686]">
              Наименование
            </TableHead>
            <TableHead class=" text-[#868686]">
              Количество
            </TableHead>
            <TableHead class="text-right text-[#868686]">
              Стоимость
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="i in 5" :key="i" class="border-[#D5D5D5]">
            <TableCell>
              Коробка для торта с окном Гофрокартон 30х40х20 см
            </TableCell>
            <TableCell>1</TableCell>
            <TableCell class="text-right">
              12.00 с.
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <div class="flex justify-end border-t py-[11px] pr-3">
        <p>Итого: <span class="font-semibold">60.00 с.</span></p>
      </div>
    </div>
  </div>
</template>
