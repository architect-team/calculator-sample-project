package architect

import (
	"fmt"
	"os"

	gjson "github.com/tidwall/gjson"
)

var _services = make(map[string]*ArchitectService)
var _datastores = make(map[string]interface{})

// CurrentService helper to get running service
func CurrentService() (*ArchitectService, error) {
	return Service(os.Getenv("ARCHITECT_CURRENT_SERVICE"))
}

// Service lookup a service dependency
func Service(serviceName string) (*ArchitectService, error) {
	service, serviceFound := _services[serviceName]
	if !serviceFound {
		architectServiceConfigs := os.Getenv("ARCHITECT")
		serviceStarted := gjson.Get(architectServiceConfigs, serviceName).Exists()
		if !serviceStarted {
			return nil, fmt.Errorf("%s has not been started", serviceName)
		}
		service = &ArchitectService{config: gjson.Get(architectServiceConfigs, serviceName).Value().(map[string]interface{})}
		_services[serviceName] = service
	}
	return service, nil
}

// Datastore lookup a datastore for the current service
func Datastore(datastoreName string) (map[string]interface{}, error) {
	datastore, datastoreFound := _datastores[datastoreName]
	if !datastoreFound {
		currentService, err := CurrentService()
		if err != nil {
			return nil, err
		}
		datastores, datastoreStarted := currentService.Config()["datastores"]
		if !datastoreStarted {
			return nil, fmt.Errorf("%s has not been started", datastoreName)
		}
		datastore = datastores.(map[string]interface{})[datastoreName]
		_datastores[datastoreName] = datastore
	}
	return datastore.(map[string]interface{}), nil
}

// Notification lookup a notification for the current service
func Notification(eventName string) (*Notifier, error) {
	currentService, err := CurrentService()
	if err != nil {
		return nil, err
	}
	subscriptions, subscriptionsFound := currentService.Config()["subscriptions"]
	if !subscriptionsFound {
		return nil, fmt.Errorf("No subscriptions found for service")
	}
	notification, notificationFound := subscriptions.(map[string]interface{})[eventName]
	if !notificationFound {
		return nil, fmt.Errorf("%s event not found on service", eventName)
	}
	return &Notifier{notification: notification.(map[string]interface{})}, nil
}
