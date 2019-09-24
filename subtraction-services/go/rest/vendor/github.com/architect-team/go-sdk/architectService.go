package architect

import (
	"github.com/go-resty/resty/v2"
)

type ArchitectService struct {
	config map[string]interface{}
	client *resty.Client
}

func (service *ArchitectService) Client() *resty.Client {
	if service.client == nil {
		client := resty.New()
		client.SetHostURL(service.config["host"].(string) + ":" + service.config["port"].(string))
		service.client = client
	}
	return service.client
}

func (service *ArchitectService) Config() map[string]interface{} {
	return service.config
}
