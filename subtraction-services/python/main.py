class Architect:
    dependencies = ['subtraction-service', 'addition-service']

    def __init__(self, subtraction_service, addition_service):
        self.subtraction_service = subtraction_service
        self.addition_service = addition_service

    def Subtract(self, request, context):
        first = request.first
        second = request.second * -1

        add_request = self.addition_service['messages'].AddRequest(first=first, second=second)
        add_response = self.addition_service['client'].Add(add_request)
        return self.subtraction_service['messages'].SubtractionResponse(output=add_response.output)
