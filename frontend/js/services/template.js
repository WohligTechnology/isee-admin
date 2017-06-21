myApp.service('TemplateService', function () {
    this.title = "Home";
    this.class="";
    this.templateTitle="";
    this.meta = "";
    this.metadesc = "";

    var d = new Date();
    this.year = d.getFullYear();

    this.init = function () {
        this.header = "views/template/header.html";
        this.sidemenu = "views/template/sidemenu.html";
        this.menu = "views/template/menu.html";
        this.content = "views/content/content.html";
        this.footer = "views/template/footer.html";
    };

    this.getHTML = function (page) {
        this.init();
        var data = this;
        data.content = "views/" + page;
        return data;
    };

    this.init();

});