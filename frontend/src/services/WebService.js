import AxiosService from "./AxiosService";
import URI from "../constants/URI"

export default class WebService extends AxiosService {

    static instance = null;

    /** Singleton Patter
    * @returns {WebService}
    */
    static getInstance() {
        if (WebService.instance == null) {
            WebService.instance = new WebService();
        }
        return this.instance;
    }

    /**
    * Get Conversations - Api call
    * Takes success and failure operations
    *
    * Required params: 
    */
    getConversations(success, failure) {
        this.getCall(URI.GET_CONVERSATIONS, success, failure, true);
    }

    /**
    * Post Message - Api call
    * Takes success and failure operations
    *
    * Required params: 
    */
    sendMessage(details, success, failure) {
        this.postCall(URI.SEND_MESSAGE, details, success, failure, true);
    }
}