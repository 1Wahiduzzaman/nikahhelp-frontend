<template>
  <div class="admin-user-container">
    <div class="panel-header">
      <div class="top-header">
        <div>
          <v-btn style="background-color: #522e8e; color: #fff" large>
            Awaiting documents for approval
          </v-btn>
        </div>
        <div class="top-right">
          <v-btn style="background-color: rgb(61 185 156); color: #fff" small>
            <v-icon dark> md-minus </v-icon>
            View rejected documents
          </v-btn>
        </div>
      </div>
      <div class="bottom-header">
        <v-tabs>
          <v-tab><v-badge color="red" content="6">All</v-badge></v-tab>
          <v-tab><v-badge color="red" content="6">Candidate</v-badge></v-tab>
          <v-tab
            ><v-badge color="red" content="6">Representative</v-badge></v-tab
          >
          <v-tab><v-badge color="red" content="6">Rep.to Cand.</v-badge></v-tab>
          <v-tab><v-badge color="red" content="6">Matchmaker</v-badge></v-tab>
        </v-tabs>
        <v-text-field
          v-model="search"
          filled
          rounded
          dense
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </div>
    </div>
    <div class="panel-content">
      <v-data-table
        v-model="selectedTasks"
        show-select
        :items="desserts"
        :headers="headers"
        :single-select="false"
        :search="search"
        item-key="name"
        class="dt-table"
        :footer-props="{
          'items-per-page-text': 'Show',
        }"
      >
        <template slot="headers" slot-scope="props">
          <tr>
            <th v-for="header in props.headers" :key="header.value">
              <span v-if="header.text !== 'actions'"> {{ header.text }}</span>
              <span v-if="header.text == 'actions'">
                <v-menu offset-y>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn color="primary" dark v-bind="attrs" v-on="on">
                      {{ header.text }}
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-item>
                      <v-list-item-title>item 1</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </span>
            </th>
          </tr>
        </template>
        <template v-slot:body="{ items }">
          <tr
            v-for="item in items"
            :key="item.name"
            @click="(e) => onItemClick(item)"
          >
            <td>
              <v-checkbox
                style="margin: 0px; padding-left: 16px"
                v-model="selectedTasks"
                :value="item"
                hide-details
              />
            </td>
            <td class="booking_artist_trackname">{{ item["name"] }}</td>
            <td class="reference">{{ item["calories"] }}</td>
            <td class="composer">{{ item["fat"] }}</td>
            <td class="composer">{{ item["carbs"] }}</td>
            <td class="publisher">
              <a
                :href="'https://www.ncbi.nlm.nih.gov/pubmed/' + item.pmid"
                target="_blank"
                >Yes</a
              >
            </td>
            <td class="publisher">
              <a
                :href="'https://www.ncbi.nlm.nih.gov/pubmed/' + item.pmid"
                target="_blank"
                >Yes</a
              >
            </td>
            <td class="Actions">
              <div>
                <v-btn style="background-color: #522e8e; color: #fff" small>
                  view
                </v-btn>
                <v-btn
                  style="background-color: rgb(42 205 100); color: #fff"
                  small
                >
                  Approve
                </v-btn>
                <v-btn
                  style="background-color: rgb(191 20 67); color: #fff"
                  small
                >
                  Reject
                </v-btn>
              </div>
            </td>
          </tr>
        </template>
      </v-data-table>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      search: "",
      selectedTasks: [],
      headers: [
        {
          text: "ID",
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "Created", value: "calories" },
        { text: "Name", value: "fat" },
        { text: "Type", value: "carbs" },
        { text: "Documents", value: "protein" },
        { text: "Images", value: "protein" },

        { text: "actions", value: "actions", sortable: false, align: "start" },
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

  methods: {
    onItemClick(e) {},
  },
};
</script>

<style lang="scss" >
.admin-user-container {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  overflow: hidden;
  border: 2px solid #ddd;
  border-radius: 15px;
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 10px 30px #fff;
  margin: 20px;
  opacity: 1;
  .panel-header {
    height: 103px;
    border-bottom: 1px solid #ccc;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    .top-header {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      padding: 5px;

      .top-right .v-btn {
        margin-right: 5px;
        border-radius: 20px;
      }
    }
    .bottom-header {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      width: 100%;
    }
  }
  .panel-content {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    padding: 0px 10px;

    .v-data-table__wrapper {
      table {
        border-collapse: separate;
        border-spacing: 0 10px;
        width: 100%;
        border: none;
        th {
          padding: 0;
        }
        .v-data-table__checkbox {
          padding-left: 15px;
        }
        tr {
          background-color: #f1f5f7;
          padding-bottom: 1em;
          td:first-child,
          th:first-child {
            border-radius: 10px 0 0 10px;
          }
          td:last-child,
          th:last-child {
            border-radius: 0 10px 10px 0;
          }
          .v-btn {
            margin: 5px;
            border-radius: 20px;
          }
        }
      }
    }
  }
  .v-select .v-select__selections input {
    display: none;
  }
  input {
    border-radius: none;
    border: none;
  }
}
</style>