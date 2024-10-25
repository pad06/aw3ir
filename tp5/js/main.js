var app;
window.onload = function () {
    app = new Vue({
        el: "#weatherApp",
        data: {
            loaded: false,
            formCityName: "",
            messageForm: "",
            cityList: [
                { name: "Paris" }, // Ville par défaut
            ],
            cityWeather: null,
            cityWeatherLoading: false,
        },
        mounted: function () {
            this.loaded = true;
            this.readData();
        },
        methods: {
            readData: function () {
                console.log("Liste des villes : ", JSON.stringify(this.cityList));
            },
            addCity: function (event) {
                event.preventDefault();

                if (this.isCityExist(this.formCityName)) {
                    this.messageForm = "Cette ville existe déjà dans la liste.";
                } else {
                    this.cityList.push({ name: this.formCityName });
                    this.messageForm = "";
                }

                this.formCityName = "";
            },
            isCityExist: function (_cityName) {
                return this.cityList.filter(item => item.name.toUpperCase() === _cityName.toUpperCase()).length > 0;
            },
            remove: function (_city) {
                this.cityList = this.cityList.filter(item => item.name !== _city.name);
            },

            // Méthode pour récupérer les données météo
            meteo: function (_city) {
                // Indiquer que le chargement est en cours
                this.cityWeatherLoading = true;

                // Remplace 'VOTRE_APIKEY' par ta vraie clé API OpenWeatherMap
                fetch(`https://api.openweathermap.org/data/2.5/weather?q=${_city.name}&units=metric&lang=fr&appid=b3344eac27ae2dd9f441551bc490908e`)
                    .then(response => {
                        // Vérifie que la réponse est au format JSON
                        if (!response.ok) {
                            throw new Error('Erreur HTTP : ' + response.status);
                        }
                        return response.json();
                    })
                    .then(json => {
                        // Une fois les données reçues
                        this.cityWeatherLoading = false;

                        // Vérifier si le code retour est 200 (OK)
                        if (json.cod === 200) {
                            // Stocker les données météo dans la variable cityWeather
                            this.cityWeather = json;
                            this.messageForm = null; // Réinitialiser le message d'erreur
                        } else {
                            // Si le code retour n'est pas 200, afficher une erreur
                            this.cityWeather = null;
                            this.messageForm = 'Météo introuvable pour ' + _city.name
                                + ' (' + json.message + ')';
                        }
                    })
                    .catch(error => {
                        // Gestion des erreurs réseau ou HTTP
                        this.cityWeatherLoading = false;
                        this.cityWeather = null;
                        this.messageForm = 'Erreur de récupération des données météo : ' + error.message;
                    });
            }
        }
    });
};
