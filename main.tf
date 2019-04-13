terraform {
    required_version = ">= 0.11.0"
}

resource "kubernetes_namespace" "namespace" {
  metadata {
    name = "architect"
  }
}

data "kubernetes_secret" "registry" {
  metadata {
    name = ""
  }
}

module "stack" {
    source = "terraform-modules/environment"
    namespace = "${kubernetes_namespace.namespace.metadata.0.name}"
    default-image-pull-secret-name = "${kubernetes_secret.registry.metadata.0.name}"
}