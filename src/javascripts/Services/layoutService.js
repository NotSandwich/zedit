ngapp.service('layoutService', function(viewFactory, randomService) {
    let service = this,
        defaultLayout = {
            "layout": "horizontal",
            "panes": [{
                "width": "45%",
                "tabs": ["treeView"]
            }, {
                "tabs": ["recordView", "referencedByView", "logView"]
            }]
        };
    // TODO: load from disk instead
    //defaultLayout = fh.loadJsonFile('layouts/default.json');

    this.buildPane = function(pane) {
        pane.id = randomService.generateUniqueId();
        if (pane.panes) pane.panes.forEach(service.buildPane);
        if (!pane.tabs) return;
        pane.tabs = pane.tabs.map(function(viewName, index) {
            let view = viewFactory.newView(viewName, index === 0);
            view.pane = pane;
            return view;
        });
    };

    this.buildDefaultLayout = function() {
        service.layout = angular.copy(defaultLayout);
        service.buildPane(service.layout);
        return service.layout;
    };

    this.findView = function(callback) {
        return service.layout.panes.findNested('tabs', 'panes', callback);
    };
});
