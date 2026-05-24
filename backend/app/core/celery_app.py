# Versión 2 — Descomentar cuando Redis esté disponible en el entorno
#
# from celery import Celery
# from .config import settings
#
# celery_app = Celery(
#     "worker",
#     broker=settings.REDIS_URL,
#     backend=settings.REDIS_URL,
# )
#
# celery_app.conf.task_routes = {
#     "app.core.celery_app.process_excel_dummy": "main-queue"
# }
#
#
# @celery_app.task
# def process_excel_dummy(file_path: str):
#     """Placeholder para procesamiento masivo de archivos con Celery."""
#     pass
