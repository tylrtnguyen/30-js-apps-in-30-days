class GitHub {
    constructor(){
        this.client_id = 'YOUR_API_KEY_HERE';
        this.client_secret = 'YOUR_SECRET_API_KEY_HERE';
        this.repos_count = 8;
        this.repos_sort = 'created: asc';
    }
    async getUser(user) {
        const profileResponse = await fetch(`https://api.github.com/users/${user}?client_id=${this.client_id}&client_secret=${this.client_secret}`);
        const profile = await profileResponse.json();

        const reposReponse = await fetch(`https://api.github.com/users/${user}/repos?per_page=${this.repos_count}&sort=${this.repos_sort}&client_id=${this.client_id}&client_secret=${this.client_secret}`)

        const repos = await reposReponse.json();

        return {
            profile,
            repos
        }
    }
}