<template>
  <v-card
    :loading="loading"
    class="mx-auto"
    max-width="374"
  >
    <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>
    <v-img
      height="250"
      src="/candidate.png"
    ></v-img>

    <v-card-title>Cafe Badilico</v-card-title>

    <div class="px-4">
        <ul class="desc-list">
            <!-- Location -->
            <li class="flex-between-start">
                <span class="flex-30 label-text">Location</span>
                <span class="flex-70">:
                    <span class="ml-1">{{ candidate.candidate.location_name }}
                    </span>
                </span>
            </li>
            <!-- Age -->
            <li class="flex-between-start">
                <span class="flex-30 label-text">Age</span>
                <span class="flex-70">:
                    <span class="ml-1">{{ candidate.candidate.age }} </span>
                </span>
            </li>
            
            <!-- Religion -->
            <li class="flex-between-start">
                <span class="flex-30 label-text">Religion</span>
                <span class="flex-70">:
                    <span class="ml-1">{{ candidate.candidate.religion }}</span>
                </span>
            </li>
            <template v-if="onceMore">
                <li class="flex-between-start">
                    <span class="flex-30 label-text">Ethnicity</span>
                    <span class="flex-70">:
                        <span class="ml-1">{{ candidate.candidate.ethnicity }} </span>
                    </span>
                </li>
                <li class="flex-between-start">
                    <span class="flex-30 label-text">Hobby</span>
                    <span class="flex-70">:
                        <span class="ml-1">  </span>
                    </span>
                </li>
            </template>
        </ul>
    </div>
    <v-divider class="mx-4"></v-divider>

    <div class="flex flex-wrap justify-space-between px-4">
        <v-btn
            class="text-capitalize"
            style="width:47%"
            rounded
            small
            color="deep-purple darken-1"
            dark
        >
            ShortList
        </v-btn>
        <v-btn
            class="text-capitalize"
            style="width:47%"
            rounded
            small
            color="deep-purple darken-1"
            dark
        >
        Teamlist
        </v-btn>
    </div>
    <div class="mt-3 px-4 flex flex-wrap justify-space-between">
        <v-btn
            class="text-capitalize"
            style="width:47%"
            rounded
            small
            color="deep-purple darken-1"
            dark
        >
        Contact
        </v-btn>
        <v-btn
            class="text-capitalize"
            style="width:47%"
            rounded
            small
            color="pink darken-1"
            dark
        >
        Block
        </v-btn>
    </div>

    <div class="px-4 pb-4 mt-4">
      <v-btn
        class="mt-1 text-capitalize"
        block
        rounded
        color="deep-purple darken-1"
        dark
        @click="reserve"
      >
        view profile
      </v-btn>
    </div>
  </v-card>
</template>

<script>
  export default {
    props: ["candidate"],
    data: () => ({
      loading: false,
      selection: 1,
    }),

    methods: {
      reserve () {
        this.loading = true

        setTimeout(() => (this.loading = false), 2000)
      },
    },
  }
</script>