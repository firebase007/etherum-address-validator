<template>
  <div>
    <b-navbar id="chat-navbar" toggleable="md" type="dark" variant="info">
      <b-navbar-brand href="/"> ETH Address Converter </b-navbar-brand>
      <b-navbar-nav class="ml-auto">
        <b-nav-item href="/verify-checksum" active>Verify Checksum</b-nav-item>
      </b-navbar-nav>
    </b-navbar>
    <section>
      <div class="container" id="text">
        <div class="row" id="text">
          <div class="col-lg-6 offset-lg-3 col-sm-10 offset-sm-1">
            <form
              class="text-center border border-primary p-5"
              style="
                margin-top: 70px;
                height: auto;
                padding-top: 100px !important;
              "
              @submit.prevent="submitAddress"
            >
              <input
                type="address"
                id="address"
                class="form-control mb-5"
                placeholder="paste eth address here to verify checksum"
                v-model="submit.address"
              />

              <div class="mt-3" v-if="responseSuccess == true">
                <hr />
                <p>
                  <i>{{ result }}</i>
                </p>

                <p>
                  <i>{{ message }}</i>
                </p>

                <hr />
              </div>

              <center>
                <button
                  large
                  @click="submitAddress"
                  class="btn btn-primary btn-block w-75 my-4"
                >
                  Verify Checksum
                </button>
              </center>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  data() {
    return {
      submit: {
        address: "",
      },
      responseSuccess: false,
    };
  },
  methods: {
    async submitAddress(e) {
      console.log(this.submit);
      try {
        let url = `address/verify/checksum?address=${this.submit.address}`;
        let response = await this.$http.get(url);
        console.log(response.data, "resp", response.data.message);
        if (response.data && response.data.status == true) {
          this.result = response.data.data;
          this.message = response.data.message;
          this.responseSuccess = true;
          this.submit.address = "";
        }
      } catch (err) {
        if (
          err.response.data.status == false &&
          err.response.data.data == null
        ) {
          this.responseSuccess = true;
          this.result = err.response.data.data;
          this.message = err.response.data.message;
          this.submit.address = "";
        }
      }
      e.preventDefault();
      this.submit.address = "";
    },
  },
};
</script>

<style>
#chat-navbar {
  margin-bottom: 55px;
}
</style>
