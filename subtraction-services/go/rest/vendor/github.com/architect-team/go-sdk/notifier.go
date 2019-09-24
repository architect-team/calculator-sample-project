package architect

import (
	mapop "github.com/linkosmos/mapop"
)

type Notifier struct {
	notification map[string]interface{}
}

// Subscriptions find all of the service subscribers
func (notifier Notifier) Subscriptions() ([](map[string]interface{}), error) {
	var subscribers [](map[string]interface{})
	for subscriberName := range notifier.notification {
		service, err := Service(subscriberName)
		if err != nil {
			return nil, err
		}
		subscriber := make(map[string]interface{})
		subscriber["name"] = subscriberName
		subscriberConfig := notifier.notification[subscriberName].(map[string]interface{})
		subscriberDetails := mapop.Merge(subscriber, subscriberConfig, service.Config())
		subscribers = append(subscribers, subscriberDetails)
	}
	return subscribers, nil
}
