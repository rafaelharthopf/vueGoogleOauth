<template>
    <div>
        <div class="form">
            <GoogleSignInBtn @click="handleClickSignIn" ></GoogleSignInBtn>

            <button 
                type="primary"
                icon="fas fa-edit"
                @click="handleClickSignIn"
                v-if="isSignIn"
                :disabled="!isInit"
            >
                sign out
            </button>
        </div>

        <div class="user">
            <div v-for="contact in contacts" :key="contact.etag" class="card" style="margin-top: 40px">
                <div class="infos">
                    <div v-for="name in contact.names" :key="name.displayNameLastFirst" class="name">
                        {{ name.displayName }} 
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import GoogleSignInBtn from '@/components/GoogleSignInBtn'


/* eslint-disable */
export default {
  name: "GoogleUser",
  components: { GoogleSignInBtn },
  props: {
    msg: String,
  },
  data() {
    return {
      isInit: false,
      isSignIn: false,
      contacts: [],

    };
  },
  methods: {
    async handleClickSignIn() {
      try {        
        const googleUser = await this.$gAuth.signIn();

        const { data } = await axios.get('https://people.googleapis.com/v1/people/me/connections?personFields=names', {
            headers: {
                'Authorization': `Bearer ${googleUser.getAuthResponse().access_token}`
            }
        })

        this.contacts = data.connections

        this.isSignIn = this.$gAuth.isAuthorized;
      } catch (error) {
        //on fail do something
        console.error(error);
        return null;
      }
    },
    async handleClickSignOut() {
      try {
        await this.$gAuth.signOut();
        this.isSignIn = this.$gAuth.isAuthorized;
        console.log("isSignIn", this.$gAuth.isAuthorized);
      } catch (error) {
        console.error(error);
      }
    }
  },
  created() {
    let that = this;
    let checkGauthLoad = setInterval(function () {
      that.isInit = that.$gAuth.isInit;
      that.isSignIn = that.$gAuth.isAuthorized;
      if (that.isInit) clearInterval(checkGauthLoad);
    }, 1000);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
.user {
  display: table;
  margin: 32px auto;
}
.user .card {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  padding: 32px;
  background-color: white;
}
.user .card .infos {
  text-align: right;
  padding-left: 32px;
}
.user .card .infos .name {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 6px;
}
.user .card .infos .email {
  font-size: 16px;
  font-weight: bold;
  font-style: italic;
  margin-bottom: 16px;
}
</style>