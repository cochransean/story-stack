# -*- coding: utf-8 -*-
# Generated by Django 1.9.5 on 2016-06-02 18:31
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('stack', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='plotpoint',
            name='discards',
            field=models.IntegerField(default=0),
        ),
    ]
