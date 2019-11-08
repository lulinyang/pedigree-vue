<template>
  <div>
    <TreeChart :json="pedigreeCharts" :class="{landscape: landscape.length}" @click-node="clickNode" />
  </div>
</template>

<script>
import TreeChart from "@/components/common/TreeChart";
import http from "@/http/server/api";
export default {
  components: {
    TreeChart
  },
  created() {
    this.id = this.$route.params.id;
    this.getTreeChart();
  },
  data() {
    return {
      id: '',
      landscape: [],
      pedigreeCharts: {
        // name: "root",
        // image_url: "https://static.refined-x.com/avat.jpg",
        // children: [
        //   {
        //     name: "children1",
        //     image_url: "https://static.refined-x.com/avat1.jpg"
        //   },
        //   {
        //     name: "children2",
        //     image_url: "https://static.refined-x.com/avat2.jpg",
        //     mate: {
        //       name: "mate",
        //       image_url: "https://static.refined-x.com/avat3.jpg"
        //     },
        //     children: [
        //       {
        //         name: "grandchild",
        //         image_url: "https://static.refined-x.com/avat.jpg"
        //       },
        //       {
        //         name: "grandchild2",
        //         image_url: "https://static.refined-x.com/avat1.jpg"
        //       },
        //       {
        //         name: "grandchild3",
        //         image_url: "https://static.refined-x.com/avat2.jpg"
        //       }
        //     ]
        //   }
        // ]
      }
    };
	},
	methods: {
    getTreeChart() {
      http.getTreeChart({surname_id: this.id}).then(res => {
        this.pedigreeCharts = res.data.data[0];
      })
    },
		clickNode: function(node){
      // eslint-disable-next-line
      console.log(node)
    }
	}
};
</script>

