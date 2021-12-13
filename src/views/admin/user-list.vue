<template>
  <div class="panel-container">
    <div class="panel-header">
      <v-btn depressed color="primary"> Primary </v-btn>
    </div>
    <div class="panel-content">
      <v-data-table
        :headers="headers"
        :items="desserts"
        :items-per-page="5"
        class="dt-table"
      ></v-data-table>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      headers: [
        {
          text: "Dessert (100g serving)",
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "Calories", value: "calories" },
        { text: "Fat (g)", value: "fat" },
        { text: "Carbs (g)", value: "carbs" },
        { text: "Protein (g)", value: "protein" },
        { text: "Iron (%)", value: "iron" },
      ],
      desserts: [
        {
          name: "Frozen Yogurt",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: "1%",
        },
        {
          name: "Ice cream sandwich",
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: "1%",
        },
        {
          name: "Eclair",
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: "7%",
        },
        {
          name: "Cupcake",
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          iron: "8%",
        },
        {
          name: "Gingerbread",
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          iron: "16%",
        },
        {
          name: "Jelly bean",
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          iron: "0%",
        },
        {
          name: "Lollipop",
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          iron: "2%",
        },
        {
          name: "Honeycomb",
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          iron: "45%",
        },
        {
          name: "Donut",
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          iron: "22%",
        },
        {
          name: "KitKat",
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: "6%",
        },
      ],
    };
  },

  methods: {},
};
</script>

<style lang="scss" scoped>
.panel-container {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: calc(100vh - 135px);
  overflow: hidden;
  border: 2px solid #ddd;
  border-radius: 15px;
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 10px 30px #fff;
  margin: 20px;
  opacity: 1;
  .panel-header {
    border-bottom: 1px solid;
  }
  .panel-content {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    padding: 50px;
    .dt-table {
      --table-height: 40px;
      --header-font-weight: 500;
      --header-font-size: 13px;
      --header-text-align: center;
      --column-separator: 1px solid transparent;
      --tb-layout: auto;

      --tbody-overflow: inherit;
      --tbody-max-height: inherit;

      table {
        table-layout: var(--tb-layout) !important;
      }

      thead {
        tr:first-child {
          height: var(--table-height) !important;
          border-bottom: 1px solid var(--bc-accent);

          th {
            text-align: var(--header-text-align);
            font-weight: var(--header-font-weight) !important;
            font-size: var(--header-font-size) !important;
          }

          th.column.sortable {
            position: relative;

            &.active {
              color: var(--text-accent);
              i {
                opacity: 0;
              }

              &::after {
                font-size: 22px;
                position: relative;
                margin-left: -18.42px;
              }

              &.asc::after {
                content: "⌃";
                top: 5px;
              }
              &.desc::after {
                content: "⌄";
                top: -5px;
              }
            }

            &:hover:not(.active) {
              i {
                // display: none;
                opacity: 0;
              }

              &::after {
                font-size: 22px;
                position: relative;
                content: "⌃";
                top: 5px;
                margin-left: -18.42px;
              }
            }

            &:focus {
              outline: none;
            }
          }
        }
      }

      tbody {
        overflow: var(--tbody-overflow);
        max-height: var(--tbody-max-height);

        tr {
          td {
            overflow: hidden;
            word-wrap: break-word;
            white-space: pre;
            max-width: 200px;
            height: 40px;

            border-left: var(--column-separator);
          }
        }
      }
    }
  }
}
</style>